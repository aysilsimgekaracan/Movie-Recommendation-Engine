import { Typography } from "@mui/material";
import CustomButton from "../../Components/CustomButton";
import { app } from "../../base";
import { Navigate, Redirect, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({ isLoggedIn }) {
  const auth = getAuth(app);

  const navigate = useNavigate();

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
          <CustomButton
            title="Sign Out"
            onClick={() => {
              signOut(auth)
                .then(alert("Successfully Signed-Out"))
                .catch((error) => {
                  alert(error.message);
                });
            }}
          />
        </>
      ) : (
        <>
          <CustomButton title="Login" onClick={() => navigate("login")} />
          <CustomButton title="Sign Up" onClick={() => navigate("signup")} />
        </>
      )}
    </header>
  );
}

export default Header;
