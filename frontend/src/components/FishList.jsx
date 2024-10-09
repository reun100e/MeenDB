import React, { useState, useEffect, useContext } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { FishContext } from "./FishContext";

function FishList() {
  const { fishList } = useContext(FishContext);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this fish?")) {
      try {
        await api.delete(`api/fish/${id}/`);
        fetchFish(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting fish:", error);
      }
    }
  };

  return (
    <div>
      <h2>Fish List</h2>
      <Link to="/add-fish">Add Fish</Link>
      <ul>
        {fishList.map((fish) => (
          <li key={fish.id}>
            {fish.common_name} ({fish.scientific_name}) - {fish.description}
            <Link to={`/edit-fish/${fish.id}`}>Edit</Link>
            <button onClick={() => handleDelete(fish.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FishList;
