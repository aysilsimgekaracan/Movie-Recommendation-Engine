import FilterButton from "../../Components/FilterButton";
import { Paper, Typography, Grid } from "@mui/material";
import { MultiList, RangeSlider } from "@appbaseio/reactivesearch";

function Filters() {
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

      <MultiList
        componentId="list-1"
        dataField="genres.keyword"
        size={100}
        style={{
          marginBottom: 20,
          color: "white",
        }}
      />
    </Paper>
  );
}

let styles = {
  mainPaper: {
    width: "20%",
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
