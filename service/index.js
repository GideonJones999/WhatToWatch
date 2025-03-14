const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const app = express();

const authCookieName = "token";

let users = []; // Stores user data in memory (resets on restart)

// Server port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/", async (req, res) => {
  return res.send("test");
});

/** 🔹 Create a New User (Signup) */
apiRouter.post("/auth/create", async (req, res) => {
  if (users.find((u) => u.email === req.body.email)) {
    return res.status(409).send({ msg: "Existing user" });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user = {
    email: req.body.email,
    password: passwordHash,
    token: uuid.v4(),
    userName: req.body.userName || "New User",
    userMaxRating: req.body.userMaxRating || "PG-13",
    userRating: req.body.userRating || ["G", "PG", "PG-13"],
    userServices: req.body.userServices || [],
    userGenres: req.body.userGenres || [],
    userRatings: {}, // { movieID: rating }
  };

  users.push(user);
  setAuthCookie(res, user.token);
  res.send({ email: user.email, userName: user.userName });
});

/** 🔹 Login an Existing User */
apiRouter.post("/auth/login", async (req, res) => {
  const user = users.find((u) => u.email === req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuid.v4(); // Generate new token
    setAuthCookie(res, user.token);
    res.send({ email: user.email, userName: user.userName });
    return;
  }
  res.status(401).send({ msg: "Unauthorized" });
});

/** 🔹 Logout a User */
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = users.find((u) => u.token === req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

/** 🔹 Middleware: Verify Authentication */
const verifyAuth = (req, res, next) => {
  const user = users.find((u) => u.token === req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

/** 🔹 Update User Preferences */
apiRouter.post("/user/preferences", verifyAuth, (req, res) => {
  Object.assign(req.user, {
    userName: req.body.userName || req.user.userName,
    userMaxRating: req.body.userMaxRating || req.user.userMaxRating,
    userRating: req.body.userRating || req.user.userRating,
    userServices: req.body.userServices || req.user.userServices,
    userGenres: req.body.userGenres || req.user.userGenres,
  });

  res.send({ msg: "User preferences updated successfully" });
});

/** 🔹 Submit a Movie Rating */
apiRouter.post("/user/rate", verifyAuth, (req, res) => {
  const { movieID, rating } = req.body;

  if (!movieID || rating === undefined) {
    return res.status(400).send({ msg: "Invalid movie rating data" });
  }

  req.user.userRatings[movieID] = rating;
  res.send({ msg: `Rated movie ${movieID} with ${rating}` });
});

/** 🔹 Retrieve User Data */
apiRouter.get("/user/data", verifyAuth, (req, res) => {
  const {
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
  } = req.user;
  res.send({
    userName,
    userMaxRating,
    userRating,
    userServices,
    userGenres,
    userRatings,
  });
});

/** 🔹 Retrieve User's Movie Ratings */
apiRouter.get("/user/ratings", verifyAuth, (req, res) => {
  res.send(req.user.userRatings);
});

/** 🔹 Set Authentication Cookie */
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

/** 🔹 Start Server */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
