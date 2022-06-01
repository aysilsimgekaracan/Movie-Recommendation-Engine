import FilterButton from "../../Components/FilterButton";
import { Paper, Typography, Grid } from "@mui/material";
import { MultiList } from "@appbaseio/reactivesearch";

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

      <MultiList
        componentId="genres-list"
        dataField="genres.keyword"
        className="genres-filter"
        size={20}
        sortBy="asc"
        queryFormat="or"
        selectAllLabel="All Genres"
        showCheckbox={true}
        showCount={true}
        showSearch={true}
        placeholder="Search for a Genre"
        react={{
          and: ["mainSearch", "results"],
        }}
        showFilter={true}
        filterLabel="Genre"
        URLParams={false}
        innerClass={{
          label: "list-item",
          input: "list-input",
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
