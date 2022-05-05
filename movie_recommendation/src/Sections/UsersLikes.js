import { Paper, Typography } from "@mui/material";
import MovieCard from "../Components/MovieCard";

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
      {isLoggedIn ? (
        likedMovies.length > 0 ? (
          likedMovies.map((result) => {
            return (
              <Typography
                variant="h4"
                gutterBottom
                style={{ color: "white" }}
                key={result.id}
              >
                {result.title ? result.title : result.name}
              </Typography>
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
    </Paper>
  );
}

export default UsersLikes;
