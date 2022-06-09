import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { AuthProvider } from "./Auth";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

// Firebase() Imports
import { useCallback, useContext } from "react";
import { db } from "./base";
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "./Auth";

import Home from "./Pages/Home/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/firebase" element={<Firebase />} />
          <Route path="/recommend" element={<Recommend />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function Recommend() {
  const { currentUser } = useContext(AuthContext);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const unsubhandleListener = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          setLikedMovies(doc.data().likes);
        }
      );

      return unsubhandleListener;
    }
  }, [currentUser, setLikedMovies]);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Giriş yapıldı: {currentUser.uid}</h1>
          {likedMovies.length > 0 ? (
            <h1>Liked something</h1>
          ) : (
            <h1>Didn't liked anything</h1>
          )}
        </div>
      ) : (
        <h1>Giriş Yapılmamış</h1>
      )}
    </div>
  );
}

function Firebase({ history }) {
  const { currentUser } = useContext(AuthContext);

  const [likedMovies, setLikedMovies] = useState();

  // const docRef = doc(db, "cities", "SF");

  // const getLikes = useCallback(async (uid) => {
  //   try {
  //     const docSnap = await getDoc(doc(db, "users", uid));
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // });

  const handleLike = useCallback(async (uid, movieId) => {
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
  });

  const handleDislike = useCallback(async (uid, movieId) => {
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
  });

  const handleListener = useCallback(async (uid) => {
    try {
      onSnapshot(doc(db, "users", uid), (doc) => {
        console.log(doc.data());
      });
    } catch (error) {
      alert(error);
    }
  });

  // const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
  //   console.log(doc.data());
  // });

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

          {console.log(handleListener(currentUser.uid))}
        </div>
      )}
    </div>
  );
}

function MovieDetail() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export default App;
