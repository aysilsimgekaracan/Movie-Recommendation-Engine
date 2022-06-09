import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";

import Home from "./Pages/Home/Home";
import Statistic from "./Pages/Statistic/Statistic";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/your_page" element={<Statistic />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
