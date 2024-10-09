import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

// Create a context
export const FishContext = createContext();

// Create a provider component
export const FishProvider = ({ children }) => {
  const [fishList, setFishList] = useState([]);

  // Fetch fish list from the API
  useEffect(() => {
    const fetchFishList = async () => {
      try {
        const res = await api.get("api/fish/");
        setFishList(res.data);
      } catch (error) {
        console.error("Error fetching fish list:", error);
      }
    };

    fetchFishList();
  }, []);

  return (
    <FishContext.Provider value={{ fishList }}>
      {children}
    </FishContext.Provider>
  );
};
