import { Typography, Skeleton } from "@mui/material";
import MovieCard from "../../Components/MovieCard";
import { useEffect, useState } from "react";
import { db } from "../../base";
import { doc, onSnapshot } from "firebase/firestore";
import { maxWidth } from "@mui/system";

const axios = require("axios").default;

function Recommendations({ results, currentUser }) {
  const [films, setFilms] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedGenres, setLikedGenres] = useState([]);

  useEffect(() => {
    if (likedGenres.length > 0) {
      let length = likedGenres.length;
      const counts = {};
      likedGenres.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });

      console.log(counts);
      const weights = {};
      for (let key in counts) {
        weights[key] = Math.floor((counts[key] / length) * 10);
      }

      console.log(weights);
      generateNewRecommendations(weights);
    }
  }, [likedGenres]);

  const generateNewRecommendations = (weights) => {
    // Request Query Data
    let functions = [];

    for (let key in weights) {
      var element = {};

      element["filter"] = {
        match_phrase: {
          genres: key,
        },
      };

      element["random_score"] = {
        seed: Math.random * 10000,
        field: "_seq_no",
      };
      element["weight"] = weights[key];

      functions.push(element);
    }

    const len = (weights) => Object.values(weights).reduce((a, b) => a + b);

    var data = JSON.stringify({
      size: len(weights),
      query: {
        function_score: {
          query: { match: { adult: false } },
          functions: functions,
        },
      },
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_APPBASE_ES_URL + "/_doc/_search",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_APPBASE_AUTHORIZATION,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFilms(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Return genres of a movie by ID or it can be a list of ids
  const getGenresFromAnId = (idList) => {
    var shouldData = [];

    for (let i in idList) {
      shouldData.push({
        match: {
          id: parseInt(idList[i]),
        },
      });
    }

    var data = JSON.stringify({
      query: {
        bool: {
          should: shouldData,
        },
      },
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_APPBASE_ES_URL + "/_doc/_search",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_APPBASE_AUTHORIZATION,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        var genres = [];
        for (var i = 0; i < response.data.hits.hits.length; i++) {
          let genresOfAFilm = response.data.hits.hits[i]._source.genres;
          genres.push(...genresOfAFilm);
        }

        setLikedGenres(genres);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // If there is no user authenticated, return 10 random movie
  const loadRandomMovies = () => {
    // Get 10 random movies
    var data = JSON.stringify({
      size: 10,
      query: {
        function_score: {
          query: { match: { adult: false } },
          random_score: {
            seed: Math.random * 1000000,
            field: "_seq_no",
          },
        },
      },
    });

    var config = {
      method: "post",
      url: process.env.REACT_APP_APPBASE_ES_URL + "/_doc/_search",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_APPBASE_AUTHORIZATION,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFilms(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!currentUser) {
      // List Random Movies
      loadRandomMovies();
    }
  }, [currentUser]);

  // Get liked movies by a user in realtime
  useEffect(() => {
    if (currentUser) {
      const unsubhandleListener = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          setLikedMovies(doc.data().likes);

          if (!doc.data().likes) {
            loadRandomMovies();
          }
        }
      );

      return unsubhandleListener;
    }
  }, [currentUser, setLikedMovies]);

  useEffect(() => {
    // If a user is authenticated, genreate random recommendations
    if (currentUser && likedMovies.length > 0) {
      getGenresFromAnId(likedMovies); // If likes have changed, calculate the recommendations again.
    }
  }, [currentUser, likedMovies]);

  useEffect(() => {
    if (currentUser && likedGenres.length === 0) {
      loadRandomMovies();
    }
  }, [currentUser, likedGenres]);

  return (
    <div style={{ width: maxWidth }}>
      <Typography sx={styles.title} variant="h5">
        {currentUser
          ? likedGenres.length > 0
            ? "Recommendations Based On Your Likes"
            : "Random Movies - Like Something!"
          : "Random Movies"}
      </Typography>
      <div className="App-recommendation" style={styles.recommendationDiv}>
        {films !== [] && films.hits !== undefined
          ? films.hits.hits.map((result) => {
              return (
                <MovieCard
                  key={result._source.id}
                  movie={result._source}
                  genres={result._source.genres}
                />
              );
            })
          : results.slice(0, 10).map((result) => {
              return (
                <Skeleton variant="rectangular" width={200} height={200} />
              );
            })}
      </div>
    </div>
  );
}

let styles = {
  title: {
    color: "white",
    borderBottom: 0.4,
    borderColor: "white",
    width: "80%",
    textAlign: "left",
    margin: "auto",
  },
  recommendationDiv: {
    flex: 1,
    width: "80%",
    margin: "auto",
  },
};

export default Recommendations;
