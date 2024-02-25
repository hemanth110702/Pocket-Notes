import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem("pocketNotesTheme"));
    if (theme) setDarkTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
