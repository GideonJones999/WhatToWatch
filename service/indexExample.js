const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

app.use(
  cors({
    origin: "http://localhost:5174", // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json());
app.use(cookieParser());

app.post("/api/auth/create", async (req, res) => {
  const {
    email,
    password,
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
  } = req.body;

  // Check if the email already exists
  if (await getUser("email", email)) {
    return res.status(409).send({ msg: "Existing user" });
  }

  // Create the new user with the provided data
  const user = await createUser(
    email,
    password,
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings
  );

  // Set the authentication cookie
  setAuthCookie(res, user);

  // Send a success response
  res.send({
    email: user.email,
    userName: user.userName,
    userMaxRating: user.userMaxRating,
    userRating: user.userRating,
    userServices: user.userServices,
    userGenres: user.userGenres,
    userRatings: user.userRatings,
  });
});

app.post("/api/auth/login", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({
        email: user.email,
        userName: user.userName,
        userMaxRating: user.userMaxRating,
        userRating: user.userRating,
        userServices: user.userServices,
        userGenres: user.userGenres,
        userRatings: user.userRatings,
      });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

app.put("/api/auth", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user);

    res.send({
      email: user.email,
      userName: user.userName,
      userMaxRating: user.userMaxRating,
      userRating: user.userRating,
      userServices: user.userServices,
      userGenres: user.userGenres,
      userRatings: user.userRatings,
    });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.delete("/api/auth", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    clearAuthCookie(res, user);
  }

  res.send({});
});

app.get("/api/user/me", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    res.send({
      email: user.email,
      userName: user.userName,
      userMaxRating: user.userMaxRating,
      userRating: user.userRating,
      userServices: user.userServices,
      userGenres: user.userGenres,
      userRatings: user.userRatings,
    });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

app.put("/api/user/update", async (req, res) => {
  const token = req.cookies["token"];
  const user = await getUser("token", token);
  if (user) {
    const {
      userName,
      userMaxRating,
      userRating,
      userServices,
      userGenres,
      userRatings,
    } = req.body;

    // Update user information
    if (userName) user.userName = userName;
    if (userMaxRating) user.userMaxRating = userMaxRating;
    if (userRating) user.userRating = userRating;
    if (userServices) user.userServices = userServices;
    if (userGenres) user.userGenres = userGenres;
    if (userRatings) user.userRatings = userRatings;

    // Send updated user data back
    res.send({
      userName: user.userName,
      userMaxRating: user.userMaxRating,
      userRating: user.userRating,
      userServices: user.userServices,
      userGenres: user.userGenres,
      userRatings: user.userRatings,
    });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

const users = [];

async function createUser(
  email,
  password,
  userName = "Default Name", // Provide default values for optional fields
  userMaxRating = "PG",
  userRating = ["G", "PG", "PG-13"],
  userServices = ["Netflix"],
  userGenres = ["Action", "Drama"],
  userRatings = {}
) {
  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create the new user object with all the profile information
  const user = {
    email,
    password: passwordHash,
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
    token: null, // Token is added later after login
  };

  // Add the user to the 'users' array (or your database)
  users.push(user);

  return user;
}

async function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie("token", user.token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie("token");
}

const port = 3000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
