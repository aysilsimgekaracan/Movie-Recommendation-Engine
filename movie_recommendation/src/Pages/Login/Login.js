import React, { useCallback, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import app from "../../base";
import { AuthContext } from "../../Auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
            const user = userCredential.user;
            alert("Sucessfully logged in!");
          })
          .catch((error) => {
            const errorCode = error.code;
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
    return <Navigate to="/" />;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back to Home Page</button>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
