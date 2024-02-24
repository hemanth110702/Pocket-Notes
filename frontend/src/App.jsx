import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useLogout } from "./hooks/useLogout";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <header>
       <Navbar />
      </header>
      <div>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={user ? <Home /> : <SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
