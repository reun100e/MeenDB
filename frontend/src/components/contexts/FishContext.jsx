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
  const [fishData, setFishData] = useState(null); // For single fish data (edit)

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
    try {
      const res = await api.get(`api/fish/${id}/`);
      setFishData(res.data);
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
      fetchFishList(); // Refresh the fish list
    } catch (error) {
      console.error("Error updating fish:", error);
    }
  };

  // Delete fish
  const deleteFish = async (id) => {
    try {
      await api.delete(`api/fish/${id}/`);
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
        fishData,
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
