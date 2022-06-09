import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCallback, useState, useEffect } from "react";
import { db } from "../../base";
import { doc, onSnapshot, arrayRemove, setDoc } from "firebase/firestore";
const axios = require("axios").default;

function UsersLikes({ currentUser }) {
  const [likedMovies, setLikedMovies] = useState([]);
  const [movieNames, setMovieNames] = useState([]);

  // Get names of given move ids'
  const getMovieNames = () => {
    if (likedMovies.length > 0) {
      var shouldData = [];

      for (let i in likedMovies) {
        shouldData.push({
          match: {
            id: parseInt(likedMovies[i]),
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
          var titles = [];
          for (var i = 0; i < response.data.hits.hits.length; i++) {
            let title = response.data.hits.hits[i]._source.original_title;
            titles.push(title);
          }

          setMovieNames(titles);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setMovieNames([]);
    }
  };

  useEffect(() => {
    getMovieNames();
  }, [likedMovies]);

  // Listen for changes in Firebase Firestore Database For Likes
  useEffect(() => {
    if (currentUser) {
      const unsubhandleListener = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          setLikedMovies(doc.data().likes);
          // console.log(doc.data().likes);
        }
      );

      return unsubhandleListener;
    }
  }, [currentUser, setLikedMovies]);

  // Remove disliked film from Firestore
  const handleDislike = useCallback(async (uid, movieId) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          likes: arrayRemove(movieId),
        },
        { merge: true }
      );
    } catch (error) {
      alert(error);
    }
  });

  return (
    <Paper sx={styles.mainPaper}>
      <Typography
        variant="h5"
        gutterBottom
        style={styles.mainTitleStyle}
        sx={styles.mainTitleSx}
      >
        Likes
      </Typography>
      <List sx={styles.list}>
        {currentUser ? (
          likedMovies.length > 0 && movieNames.length > 0 ? (
            likedMovies.map((movieId) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDislike(currentUser.uid, movieId)}
                    >
                      <Close color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={movieNames[likedMovies.indexOf(movieId)]}
                  />
                </ListItem>
              );
            })
          ) : (
            <Typography variant="h4" gutterBottom style={{ color: "white" }}>
              You didn't like anything!
            </Typography>
          )
        ) : (
          <Typography variant="h4" gutterBottom style={{ color: "white" }}>
            Please Login
          </Typography>
        )}
      </List>
    </Paper>
  );
}

let styles = {
  mainPaper: {
    width: 1 / 4,
    maxHeight: 1000,
    backgroundColor: "#212224",
    margin: 1,
  },
  mainTitleStyle: {
    color: "white",
    marginBottom: 20,
    width: "80%",
    textAlign: "left",
  },
  mainTitleSx: {
    borderBottom: 0.4,
    borderColor: "white",
  },
  list: { maxHeight: 900, position: "relative", overflow: "auto" },
};

export default UsersLikes;
