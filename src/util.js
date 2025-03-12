var userName = "Profile Name";
var userRating = "PG-13";
var userServices = ["Disney+", "Max", "Netflix"];
var userGenres = ["Action", "Romance", "Comedy"];
var userRatings = {
  "Avengers: Endgame": 10,
  Titanic: 6,
  "The Gorge": 2,
};
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

export const fetchAuthentication = () => {
  const url = "https://api.themoviedb.org/3/authentication";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
};

export const getRandMovieAPI = async (page = 1, maxPageLimit = 5) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  console.log("Page: ", page);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const json = await res.json();
    console.log(json);

    // Get user data
    const userData = getUserData();
    let userRatingPreference = [];
    if (userData.userRating == "G") {
      userRatingPreference = ["G"];
    } else if (userData.userRating == "PG") {
      userRatingPreference = ["G", "PG"];
    } else if (userData.userRating == "PG-13") {
      userRatingPreference = ["G", "PG", "PG-13"];
    } else if (userData.userRating == "R") {
      userRatingPreference = ["G", "PG", "PG-13", "R", "NR"];
    }
    // const userRatingPreference = userData.userRating; // Assuming userRating holds the certification preference

    // Filter out movies based on certification and user ratings
    const filteredMovies = await Promise.all(
      json.results.map(async (movie) => {
        const movieCertification = await getFilmRating(movie.id);
        const userHasRated = userData.userRatings[movie.title];

        // Exclude movies that don't match user certification preference or have already been rated
        if (
          movieCertification &&
          userHasRated === undefined && // Check if movie hasn't been rated
          userRatingPreference.includes(movieCertification) // Assuming preference is a string like "PG" or "R"
        ) {
          return movie;
        }
        return null; // Exclude the movie by returning null
      })
    );

    // Remove any null values (movies that were excluded)
    const validMovies = filteredMovies.filter((movie) => movie !== null);

    if (validMovies.length === 0 && page < maxPageLimit) {
      return await getRandMovieAPI(page + 1, maxPageLimit); // Recursive call with updated page number
    }

    if (validMovies.length === 0) {
      return null; // End recursion after reaching max page limit or if no valid movies found
    }

    return getFilmData(validMovies[0].id); // Return the filtered list of movies
  } catch (err) {
    console.error("Error fetching movie data:", err);
    return null; // Return null in case of error
  }
};

export const getWhereToWatchIMDB = async (filmName) => {
  const url = `https://imdb.iamidiotareyoutoo.com/justwatch?q=${filmName}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const json = await response.json();

    if (!json.description || json.description.length === 0) {
      return null; // Return null if there are no options
    }

    return json.description[0] || null;
  } catch (err) {
    console.error("Error fetching watch info:", err);
    return null;
  }
};

export const getWhereToWatchTMDB = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/watch/providers`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // Return the US results from the response
    return json.results["US"];
  } catch (err) {
    console.error("Error fetching watch providers:", err);
    return null; // Return null if there is an error
  }
};

export const getTrailer = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Failed to fetch trailer: ${response.status}`);

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null; // No videos found

    // Prioritize official trailers, then any trailer
    const officialTrailer = data.results.find(
      (video) =>
        video.type === "Trailer" && video.official && video.site === "YouTube"
    );
    const anyTrailer = data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return officialTrailer || anyTrailer || null; // Return the best available trailer
  } catch (err) {
    console.error("Error fetching trailer:", err);
    return null;
  }
};

export const getFilmRating = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/release_dates`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    const usRelease = json.results.find((entry) => entry.iso_3166_1 === "US");

    if (usRelease && usRelease.release_dates.length > 0) {
      return usRelease.release_dates[0].certification || "NR"; // Return certification or "NR" if not found
    } else {
      return "NR"; // Return "NR" if no US release data
    }
  } catch (err) {
    console.error(err);
    return "NR"; // Return "NR" in case of any error
  }
};

export const getFilmActors = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    // const cast = json.cast;
    const castMembers = [
      json.cast[0].name,
      json.cast[1].name,
      json.cast[2].name,
    ];
    // console.log(castMembers);
    return castMembers;
  } catch (err) {
    console.error(err);
    return null; // Return null if there is an error
  }
};

export const getFilmData = async (filmId) => {
  console.log("GO");
  const url = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Failed to fetch Movie Data: ${response.status}`);

    const jsonData = await response.json();

    if (!jsonData || !jsonData.title)
      throw new Error("Invalid Movie Data Recieved");

    const rating = await getFilmRating(filmId);
    if (!rating) {
      console.error("Failed to fetch rating data for movie", filmId);
      return null; // Return early if rating fetch fails
    }

    const whereToWatch = await getWhereToWatchTMDB(filmId);
    if (!whereToWatch) {
      console.error("Failed to fetch Where to Watch", filmId);
      return null;
    }

    if (!whereToWatch) {
      console.error("Failed to fetch 'Where to Watch' data for movie", filmId);
    }

    const castMembers = await getFilmActors(filmId);
    if (!castMembers) {
      console.error("Failed to fetch actors for movie", filmId);
    }
    // console.log(jsonData, rating, whereToWatch);

    const trailerURL = await getTrailer(filmId);
    if (!trailerURL) {
      console.log("Failed to fetch film Trailer", filmId);
    }

    const title = jsonData.title;
    const tagline = jsonData.tagline;
    const actors = castMembers || [];
    const description = jsonData.overview;
    const poster = `https://image.tmdb.org/t/p/original${jsonData.poster_path}`;
    const watchOffers = whereToWatch.buy || whereToWatch.flatrate;
    const userData = getUserData();
    const userRating = userData.userRatings[title] ?? 0;

    return {
      filmId,
      title,
      tagline,
      actors,
      description,
      poster,
      rating,
      userRating,
      watchOffers,
      trailer: trailerURL,
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
};

export const getFilmId = async (filmName) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${filmName}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjRlYmY4MTFlYmYwZTQ1ZTVmZjI2OWU1NWI5MjgwMCIsIm5iZiI6MTYyMDMxNzM4Mi41MDMsInN1YiI6IjYwOTQxNGM2NzY0NmZkMDA1NzEyNWUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.olDGNL1tW2PVLn57mFPU_oNHGJ5npZJroxE40BH6wQA",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Return the first result (film) from the search
      return data.results[0].id;
    } else {
      // Handle case where no results are found
      console.error("No films found for the query:", filmName);
      return null;
    }
  } catch (err) {
    console.error("Error fetching film ID:", err);
    return null;
  }
};
