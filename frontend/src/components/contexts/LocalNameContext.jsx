import React, { createContext, useState, useContext } from "react";
import api from "../../api";

export const LocalNameContext = createContext();

// Custom hook to use LocalNameContext
export const useLocalName = () => {
  return useContext(LocalNameContext);
};

export const LocalNameProvider = ({ children }) => {
  const [localNameList, setLocalNameList] = useState([]);
  const [localNameData, setLocalNameData] = useState({});

  // Fetch all local names
  const fetchLocalNames = async () => {
    try {
      const res = await api.get("/api/local-name/");
      setLocalNameList(res.data);
    } catch (error) {
      console.error("Error fetching local names:", error);
    }
  };

  // Fetch specific local name by ID
  const fetchLocalNameData = async (id) => {
    try {
      const res = await api.get(`/api/local-name/${id}/`);
      setLocalNameData(res.data);
    } catch (error) {
      console.error("Error fetching local name data:", error);
    }
  };

  // Create or update local name
  const saveLocalNameData = async (localName, id = null) => {
    try {
      if (id) {
        await api.put(`/api/local-name/${id}/`, localName);
      } else {
        await api.post("/api/local-name/", localName);
      }
    } catch (error) {
      console.error("Error saving local name data:", error);
    }
  };

  // Delete local name by ID
  const deleteLocalName = async (id) => {
    try {
      await api.delete(`/api/local-name/${id}/`);
      console.log("Local name deleted");
    } catch (error) {
      console.error("Error deleting local name:", error);
    }
  };

  return (
    <LocalNameContext.Provider
      value={{
        localNameList,
        localNameData,
        fetchLocalNames,
        fetchLocalNameData,
        saveLocalNameData,
        deleteLocalName,
      }}
    >
      {children}
    </LocalNameContext.Provider>
  );
};
