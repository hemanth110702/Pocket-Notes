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
    <nav className="flex justify-between bg-red-400 p-2 border-b-2">
      <div className="flex items-center gap-2">
        <img className="w-10" src="/logo.png" alt="logo" />
        <h1 className="text-lg font-bold font-lobster ssm:text-2xl">
          Pocket Notes
        </h1>
      </div>
      <div className="flex items-center flex-col ssm:gap-2 ssm:flex-row">
        <div className="font-time">{user && user.email.split("@")[0]}</div>
        {user && (
          <button
            className="p-2 rounded-xl  hover:border-red-400 font-bold bg-red-400 hover:bg-pink-400 hover:text-white
             transition duration-50 ease-in hover:ease-in"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {!user && (
        <div className="flex items-center gap-2">
          <Link
            className="p-1 rounded-xl  hover:border-red-400 font-bold bg-red-400 hover:bg-pink-400 hover:text-white
            sm:p-2  transition duration-50 ease-out hover:ease-in"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="p-1 rounded-xl  hover:border-red-400 font-bold bg-red-400 hover:bg-pink-400 hover:text-white sm:p-2
            transition duration-50 ease-in hover:ease-in"
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
