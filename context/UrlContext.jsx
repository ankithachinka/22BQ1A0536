import React, { createContext, useState, useEffect } from 'react';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('urlData')) || [];
    setUrls(stored);
  }, []);

  const saveUrls = (newUrls) => {
    setUrls(newUrls);
    localStorage.setItem('urlData', JSON.stringify(newUrls));
  };

  return (
    <UrlContext.Provider value={{ urls, setUrls: saveUrls }}>
      {children}
    </UrlContext.Provider>
  );
};
