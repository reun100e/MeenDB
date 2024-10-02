import React, { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function FishList() {
  const [fishList, setFishList] = useState([]);

  useEffect(() => {
    fetchFish();
  }, []);

  const fetchFish = async () => {
    try {
      const res = await api.get("api/fish/");
      setFishList(res.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    }
  };

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
            {fish.common_name} ({fish.scientific_name})
            <Link to={`/edit-fish/${fish.id}`}>Edit</Link>
            <button onClick={() => handleDelete(fish.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FishList;
