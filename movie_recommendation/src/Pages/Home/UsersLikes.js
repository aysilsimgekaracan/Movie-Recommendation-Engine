import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCallback, useState, useEffect } from "react";
import { db } from "../../base";
import { doc, onSnapshot, arrayRemove, setDoc } from "firebase/firestore";

function UsersLikes({ currentUser }) {
  const [likedMovies, setLikedMovies] = useState([]);

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
    <Paper
      sx={{
        width: 1 / 4,
        maxHeight: 1000,
        backgroundColor: "#212224",
        margin: 1,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{
          color: "white",
          marginBottom: 20,
          width: "80%",
          textAlign: "left",
        }}
        sx={{
          borderBottom: 0.4,
          borderColor: "white",
        }}
      >
        Likes
      </Typography>
      <List sx={{ maxHeight: 900, position: "relative", overflow: "auto" }}>
        {currentUser ? (
          likedMovies.length > 0 ? (
            likedMovies.map((movieId) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDislike(currentUser.uid, movieId)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText sx={{ color: "white" }} primary={movieId} />
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

export default UsersLikes;
