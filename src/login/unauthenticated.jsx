import React from "react";
import { useNavigate } from "react-router-dom";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName || "");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName); // Set userName from localStorage if available
      props.onLogin(storedUserName); // Optionally call the parent method
    }
  }, []);

  async function loginUser(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser(e) {
    e.preventDefault(); // Prevent the form from refreshing the page
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
      navigate("/");
    } else if (response?.status === 404) {
      console.log("uh oh, 404 :(");
    } else {
      const body = await response.json();
      console.error(body);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => loginUser(e)}>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <button
            variant="primary"
            type="submit"
            disabled={!userName || !password}
          >
            Login
          </button>
        </form>
        <form onSubmit={(e) => createUser(e)}>
          <button
            variant="secondary"
            type="submit"
            disabled={!userName || !password}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
