import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav>
      <h1 className="text-2xl font-bold">NavBar</h1>
      <p>{user && user.email}</p>
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
  );
};

export default Navbar;
