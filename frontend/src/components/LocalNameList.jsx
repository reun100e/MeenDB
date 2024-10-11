import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocalName } from "./contexts/LocalNameContext";

function LocalNameList() {
  const { localNameList, fetchLocalNames, deleteLocalName } = useLocalName(); // Use local name context

  useEffect(() => {
    fetchLocalNames();
  }, [fetchLocalNames]);

  // Handle delete
  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this local name?")) {
        try {
          await deleteLocalName(id);
          alert("Local name deleted successfully");
        } catch (error) {
          alert("Failed to delete local name. Please try again.");
          console.error("Delete error:", error);
        }
      }
    },
    [deleteLocalName]
  );

  return (
    <div>
      <h2>Local Name List</h2>
      <Link to="/add-local-name">Add Local Name</Link>
      <ul>
        {localNameList.map((localName) => (
          <li key={localName.id}>
            Fish name ({localName.local_name}) - {localName.region}
            <Link to={`/edit-local-name/${localName.id}`}>Edit</Link>
            <button
              onClick={() => handleDelete(localName.id)}
              aria-label={`Delete ${localName.local_name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalNameList;
