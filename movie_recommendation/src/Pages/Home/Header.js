import CustomButton from "../../Components/CustomButton";
import { app } from "../../base";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "@fontsource/poiret-one";
import { MovieFilter } from "@mui/icons-material";

function Header({ isLoggedIn }) {
  const auth = getAuth(app);

  const navigate = useNavigate();

  return (
    <header className="App-header">
      <div
        style={{
          marginLeft: 10,
          flex: 5,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <MovieFilter sx={{ fontSize: 50 }} />

        <h1
          className="title"
          style={{ fontFamily: "Poriret One", fontSize: 50 }}
        >
          Moviewise
        </h1>
      </div>

      {isLoggedIn ? (
        <>
          <CustomButton
            title="Your Page"
            onClick={() => navigate("your_page")}
          />
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
