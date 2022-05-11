import React, { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import app from "../../base";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ history }) => {
  const auth = getAuth(app);

  let navigate = useNavigate();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        alert("Successfully added");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back to Home Page</button>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
