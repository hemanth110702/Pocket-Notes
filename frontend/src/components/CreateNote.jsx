import React, { useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import apiClient from "../services/apiClient";

const CreateNote = ({setShowCreateNote}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useNotesContext();

  const createNote = async (e) => {
    e.preventDefault();
    await apiClient
      .post("/api/notes", {
        title,
        content,
      })
      .then((response) => {
        console.log(response);
        dispatch({ type: "CREATE_NOTE", payload: response.data });
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
    setShowCreate(false)
  };

  return (
    <form className="border-2 border-red-500" onSubmit={createNote}>
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
      <button>Create</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CreateNote;
