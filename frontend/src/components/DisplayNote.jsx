import React, { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import apiClient from "../services/apiClient";
import { useAuthContext } from "../context/AuthContext";

const DisplayNote = ({ displayNote, setDisplayNote }) => {
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();
  const note = notes.filter((note) => note._id === displayNote);
  const [title, setTitle] = useState(note[0].title);
  const [content, setContent] = useState(note[0].content);
  const [error, setError] = useState("");

  const updateNote = async (e) => {
    e.preventDefault();
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
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
    setDisplayNote(false);
  };

  const deleteNote = async () => {
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
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  };

  return (
    <form className="border-2 border-red-500">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />{" "}
      <br />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button onClick={updateNote}>Update</button>
      <button onClick={() => deleteNote(note._id)}>Delete</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default DisplayNote;
