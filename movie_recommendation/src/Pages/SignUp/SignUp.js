import React, { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { app, db } from "../../base";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";

const SignUp = ({ history }) => {
  const auth = getAuth(app);

  let navigate = useNavigate();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            handleFirestore(user);
            navigate("/");
          })
          .catch((error) => {
            alert(error.message);
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleFirestore = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        likes: [],
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="view">
      <button className="navigate-back" onClick={() => navigate("/")}>
        Go Back to Home Page
      </button>
      <div className="signup-div">
        <div className="signup-form">
          <h1 className="title">Sign up</h1>
          <form onSubmit={handleSignUp}>
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
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
