import { useAuthContext } from "../context/AuthContext";
import { useNotesContext } from "../context/NotesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: NotesDispatch } = useNotesContext();
  const logout = () => {
    localStorage.removeItem("workoutUSer");
    dispatch({ type: "LOGOUT" });
    NotesDispatch({ type: "SET_NOTES", payload: null });
  };

  return { logout };
};
