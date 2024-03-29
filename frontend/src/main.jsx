import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NotesContextProvider } from "./context/NotesContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <NotesContextProvider>
            <App />
          </NotesContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
