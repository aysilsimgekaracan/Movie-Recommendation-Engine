import FilterButton from "../../Components/FilterButton";
import { Paper, Typography, Grid } from "@mui/material";

function Filters({ genres, setSelectedGenres }) {
  return (
    <Paper sx={styles.mainPaper}>
      <Typography
        variant="h5"
        gutterBottom
        style={styles.titleStyle}
        sx={styles.titleSx}
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

let styles = {
  mainPaper: {
    width: 1 / 4,
    marginTop: 10,
    maxHeight: 1000,
    backgroundColor: "#212224",
    margin: 1,
  },
  titleStyle: {
    color: "white",
    marginBottom: 20,
    width: "80%",
    textAlign: "left",
  },
  titleSx: {
    borderBottom: 0.4,
    borderColor: "white",
  },
};

export default Filters;
