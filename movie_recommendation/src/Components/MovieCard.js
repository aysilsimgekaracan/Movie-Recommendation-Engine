import { Card, CardMedia, Typography, Rating } from "@mui/material";

function MovieCard({ width, posterPath, title, voteAverage }) {
  return (
    <Card sx={{ margin: 1, width }}>
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          src={"https://image.tmdb.org/t/p/w780" + posterPath}
        />
        <div style={styles.bottomBackground}>
          <Typography style={styles.text} variant="h7" gutterBottom>
            {title}
          </Typography>
          <Rating
            style={styles.rating}
            value={voteAverage / 2}
            readOnly
            precision={0.5}
            size="small"
          />
        </div>
      </div>
    </Card>
  );
}

let styles = {
  bottomBackground: {
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 50,
    maxHeight: 70,
  },
  text: {
    color: "white",
    marginLeft: 10,
    bottom: 20,
  },
  rating: {
    borderWidth: 10,
    borderColor: "yellow",
    right: 0,
    position: "absolute",
    bottom: 5,
    right: 5,
  },
};

export default MovieCard;
