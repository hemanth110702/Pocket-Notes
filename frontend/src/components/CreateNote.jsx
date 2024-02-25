import React, { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";

const CreateNote = ({ setShowCreateNote }) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useNotesContext();

  const createNote = async (e) => {
    e.preventDefault();
    await apiClient
      .post(
        "/api/notes",
        {
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch({ type: "CREATE_NOTE", payload: response.data });
        setError("");
        setShowCreateNote(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  const closeNote = () => {
    setShowCreateNote(false);
  };

  return (
    <form className="p-6 fixed border-2  border-black bg-gray-200 top-2 bottom-5 left-1/2 -translate-x-1/2 w-9/12 rounded-xl ">
      <label className="text-2xl font-bold" htmlFor="title">
        Title :
      </label>{" "}
      <br />
      <input
        type="text"
        id="title"
        className=" border-b-2 text-2xl border-black my-2 p-2 w-full outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />{" "}
      <br />
      <label className="text-2xl font-bold" htmlFor="content">
        Content :
      </label>
      <br />
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="block w-full p-4 border border-gray-300 rounded-lg resize-none h-4/6 outline-none text-lg"
      />
      <br />
      <div className="mt-auto flex flex-col justify-center items-center gap-2 nssm:flex-row  nssm:justify-between">
        {error ? (
          <div className="nssm:border-2 border-red-600 text-red-600 self-center nssm:p-2 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="border-2 border-transparent p-2 rounded-lg invisible">
            Placeholder
          </div>
        )}
        <button
          onClick={createNote}
          className="bg-green-500 p-2 rounded-xl nssm:mr-4 hover:bg-green-400 transition duration-50 ease-in hover:ease-in"
        >
          Create
        </button>
        <button
          onClick={closeNote}
          className="p-2 rounded-xl absolute top-2 right-6 font-bold hover:bg-orange-500 transition duration-50 ease-in hover:ease-in"
        >
          X
        </button>
      </div>
    </form>
  );
};

export default CreateNote;
