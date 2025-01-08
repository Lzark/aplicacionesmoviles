import React, { createContext, useState, useContext } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [Routes, setRoutes] = useState(["todo", "todo"]);

  return (
    <GlobalStateContext.Provider value={{ Routes, setRoutes }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useRoutes = () => useContext(GlobalStateContext);
