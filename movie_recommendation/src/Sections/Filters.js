import FilterButton from "../Components/FilterButton";
import { Paper, Typography, Grid } from "@mui/material";

function Filters({ genres, setSelectedGenres }) {
  return (
    <Paper
      sx={{
        width: 1 / 4,
        marginTop: 10,
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
        Filters
      </Typography>
      <Grid container rowSpacing={0}>
        {genres.map((genre) => {
          return (
            <FilterButton
              id={genre.id}
              name={genre.name}
              onClick={setSelectedGenres}
            />
          );
        })}
      </Grid>
    </Paper>
  );
}

export default Filters;
