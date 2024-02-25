import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
