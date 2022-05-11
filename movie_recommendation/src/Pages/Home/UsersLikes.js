import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function UsersLikes({ likedMovies, setLikedMovies, isLoggedIn }) {
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
        {isLoggedIn ? (
          likedMovies.length > 0 ? (
            likedMovies.map((result) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <FavoriteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={result.title ? result.title : result.name}
                  />
                </ListItem>

                // <MovieCard
                //   key={`${result.id}users_likes`}
                //   movie={result}
                //   likedMovies={likedMovies}
                //   setLikedMovies={setLikedMovies}
                //   isLikeButtonDisabled={!isLoggedIn}
                // />
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
