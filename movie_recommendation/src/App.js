import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./Auth";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

// Firebase() Imports
import { useCallback, useContext } from "react";
import { db } from "./base";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { AuthContext } from "./Auth";

import Home from "./Pages/Home/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/firebase" element={<Firebase />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  return (
    <h2>
      Movie Recommandation App Created by Zeynep Aslı Şahin, Ayşıl Simge Karacan
    </h2>
  );
}

function Firebase({ history }) {
  const { currentUser } = useContext(AuthContext);

  const handleLike = useCallback(
    async (uid, movieId) => {
      try {
        await setDoc(
          doc(db, "users", uid),
          {
            likes: arrayUnion(movieId),
          },
          { merge: true }
        );
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleDislike = useCallback(
    async (uid, movieId) => {
      try {
        await setDoc(
          doc(db, "users", uid),
          {
            likes: arrayRemove(movieId),
          },
          { merge: true }
        );
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <h1>
        {currentUser
          ? "Giriş Yapılı id: " + currentUser.uid
          : "Giriş Yapılmamış"}
      </h1>
      {currentUser && (
        <div>
          <button onClick={() => handleLike(currentUser.uid, "001")}>
            Like movie id 001
          </button>
          <button onClick={() => handleLike(currentUser.uid, "002")}>
            Like movie id 002
          </button>
          <button onClick={() => handleLike(currentUser.uid, "003")}>
            Like movie id 003
          </button>
          <button onClick={() => handleLike(currentUser.uid, "004")}>
            Like movie id 004
          </button>
          <button onClick={() => handleDislike(currentUser.uid, "003")}>
            Dislike movie id 003
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
