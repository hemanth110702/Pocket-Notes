import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <header>
        
        <nav>
          <h1 className="text-2xl font-bold">NavBar</h1>
          {user && <button onClick={handleLogout}>Logout</button>}

          {!user && (
            <div>
              <Link
                className="mr-4 hover:bg-green-500 p-4 hover:text-white"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="mr-4 hover:bg-green-500 p-4 hover:text-white"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
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
