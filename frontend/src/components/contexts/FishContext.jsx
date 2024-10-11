import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../../api";

// Create a context
export const FishContext = createContext();

// Custom hook to use the Fish context
export const useFish = () => {
  return useContext(FishContext);
};

// Create a provider component
export const FishProvider = ({ children }) => {
  const [fishList, setFishList] = useState([]);
  const [fishCache, setFishCache] = useState({}); // Cache for single fish data

  // Fetch all fish
  const fetchFishList = async () => {
    try {
      const res = await api.get("api/fish/");
      setFishList(res.data);
    } catch (error) {
      console.error("Error fetching fish list:", error);
    }
  };

  // Fetch single fish by ID (for editing)
  const fetchFishData = async (id) => {
    // Check if fish data is already in the cache
    if (fishCache[id]) {
      return fishCache[id];
    }

    try {
      const res = await api.get(`api/fish/${id}/`);
      setFishCache((prevCache) => ({
        ...prevCache,
        [id]: res.data, // Add the fetched data to cache
      }));
      return res.data;
    } catch (error) {
      console.error("Error fetching fish data:", error);
      return null;
    }
  };

  // Create new fish
  const createFish = async (data) => {
    try {
      await api.post("api/fish/", data);
      fetchFishList(); // Refresh the fish list
    } catch (error) {
      console.error("Error creating fish:", error);
    }
  };

  // Update fish
  const updateFish = async (id, data) => {
    try {
      await api.put(`api/fish/${id}/`, data);
      setFishCache((prevCache) => ({
        ...prevCache,
        [id]: data, // Update cache with the new data
      }));
      fetchFishList(); // Refresh the fish list
    } catch (error) {
      console.error("Error updating fish:", error);
    }
  };

  // Delete fish
  const deleteFish = async (id) => {
    try {
      await api.delete(`api/fish/${id}/`);
      setFishCache((prevCache) => {
        const newCache = { ...prevCache };
        delete newCache[id]; // Remove the deleted fish from cache
        return newCache;
      });
      fetchFishList(); // Refresh the fish list
    } catch (error) {
      console.error("Error deleting fish:", error);
    }
  };

  // Auto-fetch the fish list on mount
  useEffect(() => {
    fetchFishList();
  }, []);

  return (
    <FishContext.Provider
      value={{
        fishList,
        fishCache,
        fetchFishData,
        createFish,
        updateFish,
        deleteFish,
      }}
    >
      {children}
    </FishContext.Provider>
  );
};
