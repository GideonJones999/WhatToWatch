const apiURL = `http://localhost:3000/api`;

export async function createUser(userData) {
  const response = await fetch(`${apiURL}/auth/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensures cookies are included in the request
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return await response.json(); // Returns created user data
  } else {
    const errorData = await response.json();
    throw new Error(errorData.msg || "User creation failed");
  }
}

// const newUser = {
//   email: "newuser@example.com",
//   password: "securepassword",
//   userName: "NewUser123",
//   userMaxRating: "PG-13",
//   userRating: ["G", "PG", "PG-13"],
//   userServices: ["Netflix", "Hulu"],
//   userGenres: ["Action", "Comedy"],
//   userRatings: {},
// };

// createUser(newUser)
//   .then((user) => console.log("User created successfully:", user))
//   .catch((error) => console.error("Error creating user:", error.message));

export async function loginUser(email, password) {
  const response = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensures cookies are sent with the request
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return await response.json(); // Returns user data
  } else {
    throw new Error("Login failed");
  }
}

// loginUser("user@example.com", "password123")
//   .then((user) => console.log("Logged in user:", user))
//   .catch((error) => console.error(error));

export async function getCurrentUser() {
  const response = await fetch(`${apiURL}/user/me`, {
    method: "GET",
    credentials: "include", // Ensures cookies are sent with the request
  });

  if (response.ok) {
    return await response.json(); // Returns user data
  } else {
    throw new Error("User not authenticated");
  }
}

// getCurrentUser()
//   .then((user) => console.log("Current user:", user))
//   .catch((error) => console.error(error));

export async function updateUser(userData) {
  const response = await fetch("http://localhost:3000/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Update failed");
  }
}

// updateUser({ userName: "NewName", userGenres: ["Sci-Fi", "Comedy"] })
//   .then((updatedUser) => console.log("Updated user:", updatedUser))
//   .catch((error) => console.error(error));

export async function logoutUser() {
  const response = await fetch("http://localhost:3000/api/auth", {
    method: "DELETE",
    credentials: "include", // Ensures cookies are included
  });

  if (response.ok) {
    console.log("User logged out");
  } else {
    throw new Error("Logout failed");
  }
}

// logoutUser()
//   .then(() => console.log("User logged out successfully"))
//   .catch((error) => console.error(error));
