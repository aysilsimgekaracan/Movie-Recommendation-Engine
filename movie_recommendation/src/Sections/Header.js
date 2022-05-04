import { Typography } from "@mui/material";

function Header() {
  return (
    <header className="App-header">
      <Typography
        gutterBottom
        variant="h4"
        style={{ textAlign: "left", paddingLeft: 10, flex: 5 }}
      >
        Movie Recommendation
      </Typography>
      <Typography
        gutterBottom
        style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
      >
        Login
      </Typography>
      <Typography
        gutterBottom
        style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
      >
        Sign-up
      </Typography>
      <Typography
        gutterBottom
        style={{ textAlign: "left", paddingLeft: 10, flex: 1 }}
      >
        Profile
      </Typography>
    </header>
  );
}

export default Header;
