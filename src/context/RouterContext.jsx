import React, { createContext, useContext, useState } from 'react';

const RouterContext = createContext();

export const Router = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState({ 
    page: 'home', 
    params: {} 
  });

  const navigate = (page, params = {}) => {
    setCurrentRoute({ page, params });
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};


export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};