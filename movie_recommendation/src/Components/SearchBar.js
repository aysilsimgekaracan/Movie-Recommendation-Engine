import { TextField, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { ReactiveBase, SearchBox } from "@appbaseio/reactivesearch";

function SearchBar() {
  return (
    <SearchBox
      componentId="mainSearch"
      dataField={["original_title", "original_title.search"]}
      categoryField="genres.keyword"
      className="search-bar"
      queryFormat="and"
      placeholder="Search for movies..."
      iconPosition="left"
      autosuggest={true}
      filterLabel="search"
      enableRecentSuggestions={true}
      enablePopularSuggestions={true}
      enablePredictiveSuggestions={true}
      popularSuggestionsConfig={{
        size: 3,
        minHits: 2,
        minChars: 4,
      }}
      recentSuggestionsConfig={{
        size: 3,
        minChars: 4,
      }}
      index="movies-demo-app"
      size={10}
      innerClass={{ list: "list-class" }}
    />

    // <Box sx={styles.mainBox} autoComplete="off" component="form">
    //   <TextField
    //     id="searchbar"
    //     label="Search"
    //     variant="outlined"
    //     fullWidth
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <SearchIcon />
    //         </InputAdornment>
    //       ),
    //     }}
    //     sx={{ input: { color: "white" } }}
    //   />
    // </Box>
  );
}

let styles = {
  mainBox: {
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    margin: "auto",
    marginTop: 2,
  },
};

export default SearchBar;
