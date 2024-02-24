import { createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

 /*  useEffect(()=>{
    localStorage.getItem("pocketNoteUser")
  }) */

  return <AuthContext.Provider value={{...state, dispatch}}>{children}</AuthContext.Provider>;
};
