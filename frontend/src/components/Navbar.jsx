import React, { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (darkTheme) {
      document.body.style.backgroundColor = "#4c4d4f"; // Set dark mode background color
    } else {
      document.body.style.backgroundColor = "#FFFFFF"; // Set light mode background color
    }
  }, [darkTheme]);

  const changeTheme = () => {
    setDarkTheme((value) => {
      const newTheme = !value;
      localStorage.setItem("pocketNotesTheme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  return (
    <nav
      className="flex justify-between bg-red-400 p-2 border-b-2 dark:bg-black transition duration-50 ease-in hover:ease-in 
    dark:border-slate-600 "
    >
      <div className="flex items-center gap-2">
        <img className="w-10" src="/logo.png" alt="logo" />
        <h1 className="text-lg font-bold font-lobster dark:text-white ssm:text-2xl transition duration-50 ease-in hover:ease-in">
          Pocket Notes
        </h1>
      </div>

      <div>
        <button
          onClick={() => changeTheme()}
          className="bg-white rounded-full p-1"
        >
          <img
            className="w-10 h-10"
            src={darkTheme ? "/sun.png" : "/moon.png"}
            alt=""
          />
        </button>
      </div>

      <div className="flex items-center flex-col ssm:gap-2 ssm:flex-row">
        <div className="font-time dark:text-white">
          {user && user.email.split("@")[0]}
        </div>
        {user && (
          <button
            className="p-2 rounded-xl  hover:border-red-400 font-bold bg-red-400 hover:bg-pink-400 hover:text-white
             transition duration-50 ease-in hover:ease-in dark:text-white dark:hover:text-black"
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
            sm:p-2  transition duration-50 ease-out hover:ease-in dark:text-white dark:hover:text-black"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="p-1 rounded-xl  hover:border-red-400 font-bold bg-red-400 hover:bg-pink-400 hover:text-white sm:p-2
            transition duration-50 ease-in hover:ease-in dark:text-white dark:hover:text-black"
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
