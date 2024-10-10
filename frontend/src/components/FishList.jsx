import React from "react";
import { Link } from "react-router-dom";
import { useFish } from "./contexts/FishContext";

function FishList() {
  const { fishList, deleteFish } = useFish(); // Using context functions

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this fish?")) {
      deleteFish(id); // Delete fish using context
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
