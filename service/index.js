const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const users = []; // In-memory user store

/** Helper function to return only necessary user data */
function getUserResponse(user) {
  return {
    email: user.email,
    userName: user.userName,
    userMaxRating: user.userMaxRating,
    userRating: user.userRating,
    userServices: user.userServices,
    userGenres: user.userGenres,
    userRatings: user.userRatings,
    userNotInterested: user.userNotInterested,
  };
}

/** Create User */
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
    userNotInterested,
  } = req.body;

  if (await getUser("email", email)) {
    return res.status(409).send({ msg: "Existing user" });
  }

  const user = await createUser(
    email,
    password,
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
    userNotInterested,
  );
  setAuthCookie(res, user.token);

  res.send(getUserResponse(user));
});

/** Login User */
app.post("/api/auth/login", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    return res.send(getUserResponse(user));
  }
  res.status(401).send({ msg: "Unauthorized" });
});

/** Authenticate and Update User */
app.put("/api/auth", async (req, res) => {
  const user = await getUser("email", req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    setAuthCookie(res, user.token);
    return res.send(getUserResponse(user));
  }
  res.status(401).send({ msg: "Unauthorized" });
});

/** Logout User */
app.delete("/api/auth", async (req, res) => {
  const user = await getUser("token", req.cookies["token"]);
  if (user) clearAuthCookie(res, user);
  res.send({});
});

/** Get Logged-in User Data */
app.get("/api/user/me", async (req, res) => {
  const user = await getUser("token", req.cookies["token"]);
  if (user) {
    return res.send(getUserResponse(user));
  }
  res.status(404).send({ msg: "User not found" });
});

/** Update User Profile */
app.put("/api/user/update", async (req, res) => {
  const user = await getUser("token", req.cookies["token"]);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });

  Object.assign(user, req.body); // Update user fields dynamically
  res.send(getUserResponse(user));
});

/** Create a New User */
async function createUser(
  email,
  password,
  userName = "Default Name",
  userMaxRating = "PG",
  userRating = ["G", "PG", "PG-13"],
  userServices = ["Netflix"],
  userGenres = ["Action", "Drama"],
  userRatings = [],
  userNotInterested = [],
) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
    userNotInterested,
    token: uuid.v4(),
  };
  users.push(user);
  return user;
}

/** Get User by Field */
async function getUser(field, value) {
  return value ? users.find((user) => user[field] === value) : null;
}

/** Set Authentication Cookie */
function setAuthCookie(res, token) {
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

/** Clear Authentication Cookie */
function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie("token");
}

/** Start the Server */
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
