import React, { useCallback, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { app } from "../../base";
import { AuthContext } from "../../Auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

const Login = ({ history }) => {
  const auth = getAuth(app);

  let navigate = useNavigate();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            // Signed in
            // const user = userCredential.user;
            alert("Sucessfully logged in!");
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    // If already signed in return to "/"
    return <Navigate to="/" />;
  }

  return (
    <div className="view">
      <button className="navigate-back" onClick={() => navigate("/")}>
        Go Back to Home Page
      </button>
      <div className="login-div">
        <div className="login-form">
          <h1 className="title">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label className="label-email">
                Email
                <input name="email" type="email" placeholder="Email" required />
              </label>
              <label className="label-passwd">
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
