import React, { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";
import { format } from "date-fns";

const DisplayNote = ({ displayNote, setDisplayNote, setLoading }) => {
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();
  const note = notes.filter((note) => note._id === displayNote);
  const [title, setTitle] = useState(note[0].title);
  const [content, setContent] = useState(note[0].content);
  const [error, setError] = useState("");

  const updateNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiClient
      .patch(
        `/api/notes/${note[0]._id}`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch({ type: "UPDATE_NOTE", payload: response.data });
        setError("");
        setDisplayNote(false);
        const updatedNotes = notes.map((n) =>
          n._id === response.data._id ? response.data : n
        );
        dispatch({ type: "SET_NOTES", payload: updatedNotes });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.response.data);
      });
  };

  const deleteNote = async () => {
    setLoading(true);
    await apiClient
      .delete(`/api/notes/${note[0]._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: "DELETE_NOTE", payload: { _id: note[0]._id } });
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.response.data);
      });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      <form className="p-6 border-2 dark:bg-gray-500  border-black bg-gray-200 fixed top-2 bottom-20 left-1/2 -translate-x-1/2 w-9/12 rounded-xl z-50  ">
        <label className="text-2xl font-bold" htmlFor="title">
          Title :
        </label>
        <br />
        <input
          type="text"
          id="title"
          className=" border-b-2 text-2xl border-black my-2 p-2 w-full outline-none dark:bg-slate-300"
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
          className="block w-full p-4 border border-gray-300 rounded-lg resize-none h-3/6 outline-none text-lg dark:bg-slate-300"
        />
        <br />
        <div className="flex justify-between gap-2">
          {error && (
            <div className="border-2 border-red-600 text-red-600 self-center p-2 rounded-lg">
              {error}
            </div>
          )}{" "}
          {!error && (
            <div className="text-black flex flex-col font-semibold">
              <div className="hidden ssm:block">
                Created on :{" "}
                {format(new Date(note[0].createdAt), "MMM dd, HH:mm")}
              </div>
              <div>
                Last Updated :{" "}
                {format(new Date(note[0].updatedAt), "MMM dd, HH:mm")}
              </div>
            </div>
          )}
          <div className=" flex  items-center flex-col gap-1 nssm:justify-end nssm:gap-4 nssm:flex-row ">
            <button
              className=" p-2 text-sm absolute top-2 right-0 font-bold rounded-xl mr-4 hover:bg-orange-400 transition duration-50 ease-in hover:ease-in"
              onClick={() => setDisplayNote(false)}
            >
              X
            </button>
            <button
              className="bg-red-500 p-2 rounded-xl hover:bg-red-400 transition duration-50 ease-in hover:ease-in"
              onClick={deleteNote}
            >
              Delete
            </button>
            <button
              className="bg-green-500 p-2 rounded-xl mr-4 ssm:mr-0 hover:bg-green-400 transition duration-50 ease-in hover:ease-in"
              onClick={updateNote}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DisplayNote;
