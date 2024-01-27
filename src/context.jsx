import { createContext, useContext, useState } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [dashNavOpt, setDashNavOpt] = useState('view');
  // const [displa]

  const sharedProps = {
    dashNavOpt,
    setDashNavOpt,
  };

  return (
    <AppContext.Provider value={sharedProps}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
