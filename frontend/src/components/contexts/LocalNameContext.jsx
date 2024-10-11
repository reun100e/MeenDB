import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import api from "../../api";

// Create a context
export const LocalNameContext = createContext();

// Custom hook to use LocalNameContext
export const useLocalName = () => useContext(LocalNameContext);

export const LocalNameProvider = ({ children }) => {
  const [localNameList, setLocalNameList] = useState([]);
  const [localNameCache, setLocalNameCache] = useState({});

  // Fetch all local names
  const fetchLocalNames = useCallback(async () => {
    try {
      const { data } = await api.get("/api/local-name/");
      setLocalNameList(data);
    } catch (error) {
      console.error("Error fetching local names:", error);
    }
  }, []);

  // Fetch specific local name details by ID
  const fetchLocalNameData = useCallback(
    async (id) => {
      if (localNameCache[id]) {
        return localNameCache[id];
      }
      try {
        const { data } = await api.get(`/api/local-name/${id}/`);
        setLocalNameCache((prevCache) => ({
          ...prevCache,
          [id]: data,
        }));
        return data;
      } catch (error) {
        console.error("Error fetching local name data:", error);
        return null;
      }
    },
    [localNameCache]
  );

  // POST, PUT, and update cache of local name by ID
  const saveLocalNameData = useCallback(
    async (localName, id = null) => {
      try {
        let data;
        if (id) {
          const { data: responseData } = await api.put(
            `/api/local-name/${id}/`,
            localName
          );
          data = responseData;
        } else {
          const { data: responseData } = await api.post(
            "/api/local-name/",
            localName
          );
          data = responseData;
        }
        setLocalNameCache((prevCache) => ({
          ...prevCache,
          [data.id]: data,
        }));
        fetchLocalNames(); // Refresh the list
      } catch (error) {
        console.error("Error saving local name data:", error);
      }
    },
    [fetchLocalNames]
  );

  // Delete local name by ID
  const deleteLocalName = useCallback(
    async (id) => {
      try {
        await api.delete(`/api/local-name/${id}/`);
        setLocalNameCache((prevCache) => {
          const newCache = { ...prevCache };
          delete newCache[id];
          return newCache;
        });
        fetchLocalNames(); // Refresh the list
      } catch (error) {
        console.error("Error deleting local name:", error);
      }
    },
    [fetchLocalNames]
  );

  const contextValue = useMemo(
    () => ({
      localNameList,
      localNameCache,
      fetchLocalNames,
      fetchLocalNameData,
      saveLocalNameData,
      deleteLocalName,
    }),
    [
      localNameList,
      localNameCache,
      fetchLocalNames,
      fetchLocalNameData,
      saveLocalNameData,
      deleteLocalName,
    ]
  );

  return (
    <LocalNameContext.Provider value={contextValue}>
      {children}
    </LocalNameContext.Provider>
  );
};
