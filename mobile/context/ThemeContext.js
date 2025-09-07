// context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import { THEMES } from "../constants/colors"; // adjust path if needed

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("ocean");

  const setTheme = (name) => setThemeName(name);

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeName], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
