import React, { useState, useCallback } from "react";
import { useFish } from "./contexts/FishContext";

function FishSearchBar() {
  const { fishList } = useFish(); // Fetch fish list from context
  const [searchTerm, setSearchTerm] = useState(""); // Track user input

  // Function to handle search input
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  // Filter the fish list based on search term
  const filteredFishList = fishList.filter((fish) =>
    Object.values(fish).some((val) =>
      val.toString().toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search fish..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredFishList.map((fish) => (
          <li key={fish.id}>
            {fish.common_name} ({fish.scientific_name}) - {fish.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FishSearchBar;
