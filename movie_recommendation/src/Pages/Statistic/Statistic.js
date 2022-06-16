import { useContext, useEffect, useState } from "react";
import "./Statistic.css";
import { AuthContext } from "../../Auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../base";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import { PieChart } from "react-minimal-pie-chart";
import AnimatedNumbers from "react-animated-numbers";
import MovieCard from "../../Components/MovieCard";
const axios = require("axios").default;

function Statistic() {
  let navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedGenres, setLikedGenres] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]); // ids from flask
  const [recommendedFilms, setRecommendedFilms] = useState([]); // es response of recommendation ids

  const getNameOfAFilm = (film_id) => {
    var data = JSON.stringify({
      query: {
        match: {
          id: film_id,
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
        // console.log(response);
        setSelectedMovieTitle(response.data.hits.hits[0]._source.title);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Get recommendations from Flask
  const getRecommendedIds = () => {
    let random_id = likedMovies[Math.floor(Math.random() * likedMovies.length)];
    getNameOfAFilm(random_id);
  };

  useEffect(() => {
    if (selectedMovieTitle != "") {
      fetch(
        `http://127.0.0.1:5000/engine?title=${selectedMovieTitle
          .split(" ")
          .join("+")}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data.response);
          // console.log(data);
        });
    }
  }, [selectedMovieTitle]);

  useEffect(() => {
    if (recommendations.length > 0) {
      getRecommendedMovies();
    }
  }, [recommendations]);

  const getRecommendedMovies = () => {
    var shouldData = [];
    for (let i in recommendations) {
      shouldData.push({
        match: {
          id: parseInt(recommendations[i]),
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
        // console.log(response.data);
        setRecommendedFilms(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Get liked movies by a user in realtime
  useEffect(() => {
    if (currentUser) {
      const unsubhandleListener = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          setLikedMovies(doc.data().likes);
        }
      );

      return unsubhandleListener;
    }
  }, [currentUser]);

  useEffect(() => {
    if (likedMovies.length > 0) {
      getRecommendedIds();
    }
  }, [likedMovies]);

  // useEffect(() => {
  //   // If a user is authenticated, genreate random recommendations
  //   if (currentUser && likedMovies.length > 0) {
  //     getGenresFromAnId(likedMovies); // If likes have changed, calculate the recommendations again.
  //   }
  // }, [currentUser, likedMovies]);

  // useEffect(() => {
  //   if (currentUser && likedMovies.length === 0) {
  //     setLikedGenres([]);
  //   }
  // }, [likedMovies, currentUser, setLikedGenres]);

  // // Return genres of a movie by ID or it can be a list of ids
  // const getGenresFromAnId = (idList) => {
  //   var shouldData = [];

  //   for (let i in idList) {
  //     shouldData.push({
  //       match: {
  //         id: parseInt(idList[i]),
  //       },
  //     });
  //   }

  //   var data = JSON.stringify({
  //     query: {
  //       bool: {
  //         should: shouldData,
  //       },
  //     },
  //   });

  //   var config = {
  //     method: "post",
  //     url: process.env.REACT_APP_APPBASE_ES_URL + "/_doc/_search",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: process.env.REACT_APP_APPBASE_AUTHORIZATION,
  //     },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       var genres = [];
  //       for (var i = 0; i < response.data.hits.hits.length; i++) {
  //         let genresOfAFilm = response.data.hits.hits[i]._source.genres;
  //         genres.push(...genresOfAFilm);
  //       }

  //       setLikedGenres(genres);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   if (likedGenres.length > 0) {
  //     let length = likedGenres.length;
  //     const counts = {};
  //     likedGenres.forEach((element) => {
  //       counts[element] = (counts[element] || 0) + 1;
  //     });
  //     const weights = [];
  //     for (let key in counts) {
  //       weights.push({
  //         title: key,
  //         value: counts[key],
  //         color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
  //       });
  //     }
  //     setGenreData(weights);
  //   }
  // }, [likedGenres]);

  return (
    <div className="main-div">
      <button className="navigate-back" onClick={() => navigate("/")}>
        Go Back to Home Page
      </button>
      {currentUser ? (
        <div className="secondary-div">
          <h1>Welcome {currentUser.email},</h1>
          {likedMovies.length > 0 ? (
            <div className="statistics-div">
              <div className="container">
                <h2>So far the number of movies you liked: </h2>
                <AnimatedNumbers
                  animateToNumber={likedMovies.length}
                  fontStyle={{ fontSize: 32 }}
                  configs={{ tension: 89, friction: 40 }}
                  animationType={"calm"}
                />
              </div>
              {/* <div className="container" style={{ maxHeight: "600px" }}>
                <h2>Your Genre Taste</h2>
                <PieChart
                  data={genreData}
                  viewBoxSize={[300, 300]}
                  label={({ dataEntry }) =>
                    dataEntry.percentage.toFixed() + "% " + dataEntry.title
                  }
                  labelStyle={{ fontSize: "5px" }}
                  lineWidth={50}
                  labelPosition={70}
                  style={{ height: "100%" }}
                />
              </div> */}
              {selectedMovieTitle !== "" && (
                <div className="container">
                  <h2>Because you liked {selectedMovieTitle} in your list</h2>
                  <div className="recommendations-div">
                    {recommendedFilms.length !== [] &&
                      recommendedFilms.hits !== undefined &&
                      recommendedFilms.hits.hits.map((result) => {
                        return (
                          <MovieCard
                            key={result._source.id}
                            movie={result._source}
                            genres={result._source.genres}
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={118} />
          )}
        </div>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
}

export default Statistic;
