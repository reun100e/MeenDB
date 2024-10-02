import React, { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function LocalNameList() {
  const [localNames, setLocalNames] = useState([]);

  useEffect(() => {
    fetchLocalNames();
  }, []);

  const fetchLocalNames = async () => {
    try {
      const res = await api.get("/local-names/");
      setLocalNames(res.data);
    } catch (error) {
      console.error("Error fetching local names:", error);
    }
  };

  return (
    <div>
      <h2>Local Names</h2>
      <Link to="/add-local-name">Add Local Name</Link>
      <ul>
        {localNames.map((localName) => (
          <li key={localName.id}>
            {localName.local_name} ({localName.region})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalNameList;
