import { Typography } from "@mui/material";
import CustomButton from "../Components/CustomButton";

function Header({ setIsLoggedIn, isLoggedIn }) {
  return (
    <header className="App-header">
      <Typography
        gutterBottom
        variant="h4"
        style={{ textAlign: "left", paddingLeft: 10, flex: 5 }}
      >
        Movie Recommendation
      </Typography>
      {isLoggedIn ? (
        <>
          <CustomButton title="Profile" />
          <CustomButton title="Log Out" onClick={() => setIsLoggedIn(false)} />
        </>
      ) : (
        <>
          <CustomButton title="Login" onClick={() => setIsLoggedIn(true)} />
          <CustomButton title="Sign-up" onClick={() => setIsLoggedIn(true)} />
        </>
      )}
    </header>
  );
}

export default Header;
