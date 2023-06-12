import React, { createContext, useState, useContext } from "react";

const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const openSideBar = () => setSideBarOpen(true);
  const closeSideBar = () => setSideBarOpen(false);

  return (
    <UiContext.Provider
      value={{
        sideBarOpen,
        openSideBar,
        closeSideBar,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

/**
 * A React hook to expose context values to components.
 */
export const useUi = () => {
  const Ui = useContext(UiContext);
  if (Ui === null)
    throw new Error(
      "useUi must be used within the context of the SearchContext.Provider"
    );
  return Ui;
};
