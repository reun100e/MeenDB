import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFish } from "./contexts/FishContext";

function FishForm() {
  // Using context functions
  const { fetchFishData, createFish, updateFish, fishList, fishCache } =
    useFish();
  const [formData, setFormData] = useState({
    common_name: "",
    scientific_name: "",
    description: "",
  });
  const [originalData, setOriginalData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch fish data if editing, or use cached data
  useEffect(() => {
    if (id) {
      const cachedFish = fishCache[id]; // Check cache first
      if (cachedFish) {
        setFormData(cachedFish);
        setOriginalData(cachedFish);
      } else {
        const loadFishData = async () => {
          const data = await fetchFishData(id);
          if (data) {
            const relevantData = {
              common_name: data.common_name || "",
              scientific_name: data.scientific_name || "",
              description: data.description || "",
            };
            setFormData(relevantData);
            setOriginalData(relevantData);
          }
        };
        loadFishData();
      }
    }
  }, [id, fishCache, fetchFishData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Check if relevant data has changed before updating
        const hasChanged = [
          "common_name",
          "scientific_name",
          "description",
        ].some((key) => formData[key] !== originalData[key]);
        if (hasChanged) {
          await updateFish(id, formData);
          console.log("Changes detected. Updating fish.");
        } else {
          console.log("No changes detected. Skipping update.");
          navigate("/fish");
          return;
        }
      } else {
        // Check if a fish with the same common name already exists
        const existingFish = fishList.find(
          (fish) =>
            fish.common_name.toLowerCase() ===
            formData.common_name.toLowerCase()
        );
        if (existingFish) {
          console.log("A fish with this common name already exists.");
          // Should show an error message to the user that the fish already exists
          return;
        }
        await createFish(formData);
      }
      navigate("/fish");
    } catch (error) {
      console.error("Error saving fish data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>{id ? "Edit Fish" : "Add Fish"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="common_name"
          placeholder="Common Name"
          value={formData.common_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="scientific_name"
          placeholder="Scientific Name"
          value={formData.scientific_name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">{id ? "Update" : "Add"} Fish</button>
      </form>
    </div>
  );
}

export default FishForm;
