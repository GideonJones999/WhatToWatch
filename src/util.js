import { tmdbAuth } from "../security";

let serverAddress = "http://localhost:3000";

export async function getUserDataAPI() {
  try {
    const response = await fetch("http://localhost:3000/api/user/me", {
      method: "GET",
      credentials: "include", // Include cookies in request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const userData = await response.json();
    console.log("User Data:", userData);
    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

let tempUser = {
  userName: "test",
  email: "gideon.w.jones@gmail.com",
  userMaxRating: "PG-13",
  userRating: ["G", "PG", "PG-13"],
  userServices: ["Disney+", "Netflix"],
  userGenres: ["Action", "Comedy"],
  userRatings: [],
};

export const getUserData = () => {
  return {
    userName: tempUser.userName,
    email: tempUser.email,
    userMaxRating: tempUser.userMaxRating,
    userRating: tempUser.userRating,
    userServices: tempUser.userServices,
    userGenres: tempUser.userGenres,
    userRatings: tempUser.userRatings,
  };
};

export const setUserData = (name, rating, services, genres) => {
  const userRatingPreference = [];
  switch (rating) {
    case "R":
      userRatingPreference.push("R", "NR");
    case "PG-13":
      userRatingPreference.push("PG-13");
    case "PG":
      userRatingPreference.push("PG");
    case "G":
      userRatingPreference.push("G");
      break;
    default:
      break;
  }
  tempUser.userName = name;
  tempUser.userMaxRating = rating;
  tempUser.userRating = userRatingPreference;
  tempUser.userServices = services;
  tempUser.userGenres = genres;
};

export const setUserDataAPI = async (name, rating, services, genres) => {
  const userRatingPreference = [];
  switch (rating) {
    case "R":
      userRatingPreference.push("R", "NR");
    case "PG-13":
      userRatingPreference.push("PG-13");
    case "PG":
      userRatingPreference.push("PG");
    case "G":
      userRatingPreference.push("G");
      break;
    default:
      break;
  }

  try {
    const response = await fetch(`${serverAddress}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        userMaxRating: rating,
        userRating: userRatingPreference,
        userServices: services,
        userGenres: genres,
      }),
    });

    if (!response.ok) throw new Error("Failed to update user data");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

export const setUserRatingsAPI = async (movieID, rating) => {
  try {
    const response = await fetch(`${serverAddress}/api/user/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieID, rating }),
    });

    if (!response.ok) throw new Error("Failed to update movie rating");
  } catch (error) {
    console.error("Error updating movie rating:", error);
  }
};

export const setUserRatings = (movieID, rating) => {
  tempUser.userRatings[movieID] = rating;
};

export const fetchAuthentication = () => {
  const url = "https://api.themoviedb.org/3/authentication";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tmdbAuth(),
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
};

export const getRandMovieAPI = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  console.log("Page: ", page);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tmdbAuth(),
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const json = await res.json();
    console.log(json);

    // Get user data
    const userData = getUserData();
    let userRatingPreference = userData.userRating;

    // Filter out movies based on certification and user ratings
    const filteredMovies = await Promise.all(
      json.results.map(async (movie) => {
        const movieCertification = await getFilmRating(movie.id);
        const userHasRated = userData.userRatings[movie.id];

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

    if (validMovies.length === 0 && page < json.total_pages) {
      return await getRandMovieAPI(page + 1); // Recursive call with updated page number
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

export const getWhereToWatchTMDB = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/watch/providers`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tmdbAuth(),
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // Return the US results from the response
    const results = json?.results["US"] || [];
    // console.log(json.results);
    // console.log(results);
    const offers = [
      ...(results.buy || []),
      ...(results.flatrate || []),
      ...(results.rent || []),
    ];
    const uniqueProviders = new Map(); // Use Map to ensure unique provider_id

    for (let offer of offers) {
      if (!uniqueProviders.has(offer.provider_id)) {
        let provider_url;
        let filmName = await getFilmName(filmId);
        switch (offer.provider_id) {
          case 10:
            provider_url = `https://www.amazon.com/s?k=${filmName}&i=movies-tv&rh=n%3A2625373011%2Cp_n_format_browse-bin%3A2650306011&dc`;
            break;
          case 2:
          case 350:
          case 2243:
            provider_url = `https://tv.apple.com/search?term=${filmName}`;
            break;
          case 3:
            provider_url = `https://play.google.com/store/search?q=${filmName}&c=movies&hl=en_US&gl=US`;
            break;
          case 192:
            provider_url = `https://www.youtube.com/results?search_query=%22${filmName}%22+AND+%22YouTube+Movies%22%2C+channel`;
            break;
          case 37:
          case 7:
            provider_url = `https://athome.fandango.com/content/browse/search?minVisible=0&returnUrl=%252Fcontent%252Fbrowse%252Fuxrow%252FFandango-At-Home%252F13809&searchString=${filmName}`;
            break;
          case 68:
            provider_url = `https://www.microsoft.com/en-us/search/shop/movies?q=${filmName}`;
            break;
          case 486:
            provider_url = "https://watch.spectrum.net";
            break;
          case 1899:
          case 1825:
            provider_url = "https://www.max.com/";
            break;
          case 212:
            provider_url = "https://hoopla.com/";
            break;
          case 257:
            provider_url = "https://fubo.tv/";
            break;
          case 1853:
          case 531:
          case 582:
          case 633:
            provider_url = "https://paramountplus.com/";
            break;
          case 538:
            provider_url = "https://plex.tv";
            break;
          case 34:
            provider_url = "https://mgmplus.com";
            break;
          default:
            provider_url = "https://google.com";
            break;
        }
        uniqueProviders.set(offer.provider_id, {
          provider_name: offer.provider_name,
          url: provider_url,
        });
      }
    }

    // Convert Map values to array
    const providers = Array.from(uniqueProviders.values());

    // console.log(providers);
    return providers;
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
      Authorization: tmdbAuth(),
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
      Authorization: tmdbAuth(),
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    const usRelease = json.results.find((entry) => entry.iso_3166_1 === "US");

    if (usRelease && usRelease.release_dates.length > 0) {
      return (
        usRelease.release_dates[usRelease.release_dates.length - 1]
          .certification || "NR"
      ); // Return certification or "NR" if not found
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
      Authorization: tmdbAuth(),
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
      Authorization: tmdbAuth(),
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
      whereToWatch,
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
      Authorization: tmdbAuth(),
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

export const getFilmIdFiltered = async (filmName, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${filmName}&include_adult=false&language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tmdbAuth(),
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const json = await res.json();

    // Get user data
    const userData = getUserData();
    let userRatingPreference = userData.userRating;
    console.log("User Rating Preferences:", userRatingPreference);

    // Fetch movie ratings asynchronously
    const moviesWithRatings = await Promise.all(
      json.results.map(async (movie) => {
        const movieCertification = await getFilmRating(movie.id);
        return { ...movie, certification: movieCertification };
      })
    );

    // Filter movies based on user preferences
    const validMovies = moviesWithRatings.filter(
      (movie) =>
        movie.certification &&
        userRatingPreference.includes(movie.certification)
    );

    if (validMovies.length === 0 && page < json.total_pages) {
      console.log(
        `No valid movies found on page ${page}, fetching next page...`
      );
      return await getFilmIdFiltered(filmName, page + 1);
    }

    if (validMovies.length === 0) {
      console.log("No suitable films found.");
      return null;
    }

    console.log(`Returning movie:`, validMovies[0]);
    return validMovies[0].id; // Return the first valid movie
  } catch (err) {
    console.error("Error fetching movie data:", err);
    return null;
  }
};

export const getFilmName = async (filmId) => {
  const url = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: tmdbAuth(),
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Failed to fetch Movie Data: ${response.status}`);

    const jsonData = await response.json();

    if (!jsonData || !jsonData.title)
      throw new Error("Invalid Movie Data Recieved");

    return jsonData.title;
  } catch (error) {
    console.error("Error fetching movie title:", error);
    return null;
  }
};
