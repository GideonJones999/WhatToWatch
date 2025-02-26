export const getRandMovie = () => {
  return {
    title: "Spider-Man: No Way Home",
    tagline: "The Multiverse unleashed.",
    description:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    actors: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    trailer: "https://youtu.be/1mTjfMFyPi8",
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    whereToWatch: "Starz",
    watchLink:
      "https://therokuchannel.roku.com/details/e7c1c173526e5ea0930e70a731ee0776/spider-man-no-way-home",
  };
};

var userName = "Profile Name";
var userRating = "PG-13";
var userServices = ["Disney+", "Max", "Netflix"];
var userGenres = ["Action", "Romance", "Comedy"];
var userRatings = { "Avengers: Endgame": 10, Titanic: 6 };
var userPicture = "";

export const getUserData = () => {
  return {
    userName: userName,
    userRating: userRating,
    userServices: userServices,
    userGenres: userGenres,
    userRatings: userRatings,
    userPicture: userPicture,
  };
};

export const setUserData = (name, rating, services, genres, picture) => {
  userName = name;
  userRating = rating;
  userServices = services;
  userGenres = genres;
  userPicture = picture;
};

export const setUserRatings = (movie, rating) => {
  userRatings[movie] = rating;
};
