import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="bg-red-500 flex flex-col w-fit m-auto mt-16 p-10 rounded-bl-full rounded-br-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center mb-6 bg-red-300 rounded-xl font-lobster p-2  dark:text-white">
        Login
      </h1>
      <label className="font-semibold" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="outline-none focus:outline-blue-600 text-sm p-1 rounded-sm  invalid:outline-yellow-300 "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="font-semibold mt-4" htmlFor="pwd">
        Password
      </label>
      <input
        type="text"
        id="pwd"
        className=" outline-none focus:outline-blue-600 text-sm p-1 rounded-sm  invalid:outline-red-500  "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className="mt-4 bg-blue-500 text-white font-bold transition duration-50 ease-in hover:ease-in w-fit self-center p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        disabled={isLoading}
      >
        Login
      </button>
      {error && (
        <div className="border-2 rounded-lg  border-red-600 bg-white mt-4 p-2 text-red-500">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
