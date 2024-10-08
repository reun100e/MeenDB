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
      const res = await api.get("api/local-name/");
      setLocalNames(res.data);
    } catch (error) {
      console.error("Error fetching local names data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this local name?")) {
      try {
        await api.delete(`api/local-name/${id}/`);
        fetchLocalNames(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting local name:", error);
      }
    }
  };

  return (
    <div>
      <h2>Local Name List</h2>
      <Link to="/add-local-name">Add Local Name</Link>
      <ul>
        {localNames.map((localName) => (
          <li key={localName.id}>
            Fish name ({localName.local_name}) - {localName.region}
            <Link to={`/edit-local-name/${localName.id}`}>Edit</Link>
            <button onClick={() => handleDelete(localName.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalNameList;
