import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./Auth";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

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

export default App;
