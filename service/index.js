const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();
const DB = require("./database.js"); // Assuming you have a database module

const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use("/api", apiRouter);

/** Create User */
apiRouter.post("/auth/create", async (req, res) => {
  const {
    email,
    password,
    userName,
    userMaxRating,
    userServices,
    userGenres,
    userRatings,
    userNotInterested,
    userRating,
  } = req.body;

  if (await DB.getUser("email", email)) {
    return res.status(409).send({ msg: "Existing user" });
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      email,
      passwordHash,
      userName,
      userMaxRating,
      userServices,
      userGenres,
      userRatings,
      userNotInterested,
      userRating,
      token: uuid.v4(),
    };
    const createdUser = await DB.addUser(user); // Assuming you have a function to add the user to the database
    setAuthCookie(res, user.token);
    res.status(201).send({ user: createdUser.email });
  }
});

/** Login User */
apiRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Logging in user:", { email, password });
    const user = await DB.getUser(email);
    console.log("User found:", user);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      console.log("Password match, generating token");
      user.token = uuid.v4();
      const newUser = await DB.updateUser(user); // Assuming you have a function to update the user in the database
      setAuthCookie(res, newUser.token);
      return res
        .status(200)
        .send({ email: user.email, userName: user.userName });
    } else {
      console.log("Invalid credentials");
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

apiRouter.post("/user/update", async (req, res) => {
  const user = req.body;

  try {
    const updatedUser = await DB.updateUser(user);
    console.log("User updated:", updatedUser);
    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

/** Logout User */
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  console.log("Verifying auth token:", req.cookies);
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    console.log("Unauthorized access attempt:", req.cookies[authCookieName]);
    res.status(401).send({ msg: "Unauthorized" });
  }
};

/** Get Logged-in User Data */
apiRouter.get("/user/me", async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (!user) return res.status(401).send({ msg: "Unauthorized" });
  console.log("User found:", user._id);
  res.send(user);
});

/** Set Authentication Cookie */
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    // secure: process.env.NODE_ENV === "production", // Only secure cookies in production
    httpOnly: true,
    sameSite: "strict",
  });
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

/** Start the Server */
app.listen(port, () => console.log(`Listening on port ${port}`));
