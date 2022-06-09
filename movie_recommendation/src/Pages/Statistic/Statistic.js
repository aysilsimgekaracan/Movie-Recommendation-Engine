import { useContext, useEffect, useState } from "react";
import "./Statistic.css";
import { AuthContext } from "../../Auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../base";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import { PieChart } from "react-minimal-pie-chart";
import AnimatedNumbers from "react-animated-numbers";
const axios = require("axios").default;

function Statistic() {
  let navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const [likedMovies, setLikedMovies] = useState([]);
  const [likedGenres, setLikedGenres] = useState([]);
  const [genreData, setGenreData] = useState([]);

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
  }, [currentUser, setLikedMovies]);

  useEffect(() => {
    // If a user is authenticated, genreate random recommendations
    if (currentUser && likedMovies.length > 0) {
      getGenresFromAnId(likedMovies); // If likes have changed, calculate the recommendations again.
    }
  }, [currentUser, likedMovies]);

  useEffect(() => {
    if (currentUser && likedMovies.length === 0) {
      setLikedGenres([]);
    }
  }, [likedMovies, currentUser, setLikedGenres]);

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

  useEffect(() => {
    if (likedGenres.length > 0) {
      let length = likedGenres.length;
      const counts = {};
      likedGenres.forEach((element) => {
        counts[element] = (counts[element] || 0) + 1;
      });
      const weights = [];
      for (let key in counts) {
        weights.push({
          title: key,
          value: counts[key],
          color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
        });
      }
      setGenreData(weights);
    }
  }, [likedGenres]);

  useEffect(() => {
    console.log(genreData);
  }, [genreData]);

  return (
    <div className="main-div">
      <button className="navigate-back" onClick={() => navigate("/")}>
        Go Back to Home Page
      </button>
      {currentUser ? (
        <div className="secondary-div">
          <h1>Welcome {currentUser.email},</h1>
          {likedGenres.length > 0 ? (
            <div>
              <div className="container">
                <h2>Your Genre Taste</h2>
                <PieChart
                  data={genreData}
                  viewBoxSize={[300, 300]}
                  label={({ dataEntry }) =>
                    dataEntry.percentage + "% " + dataEntry.title
                  }
                  labelStyle={{ fontSize: "5px" }}
                  lineWidth={50}
                  labelPosition={70}
                  style={{ height: "100%" }}
                />
              </div>
              <div className="container">
                <h2>So far the number of movies you liked: </h2>
                <AnimatedNumbers
                  animateToNumber={likedMovies.length}
                  fontStyle={{ fontSize: 32 }}
                  configs={(number, index) => {
                    return {
                      mass: 1,
                      tension: 230 * (index + 1),
                      friction: 140,
                    };
                  }}
                />
              </div>
              <div className="container">
                <h2>Because you liked "Some Movie" to your list</h2>
                <h2>Recommended films...</h2>
              </div>
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
