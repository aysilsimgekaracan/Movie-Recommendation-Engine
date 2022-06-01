import { TextField, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <Box sx={styles.mainBox} autoComplete="off" component="form">
      <TextField
        id="searchbar"
        label="Search"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ input: { color: "white" } }}
      />
    </Box>
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
