import React, { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { app, db } from "../../base";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

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
