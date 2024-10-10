import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFish } from "./contexts/FishContext";

function FishForm() {
  const { fishData, fetchFishData, createFish, updateFish } = useFish(); // Using context functions
  const [formData, setFormData] = useState({
    common_name: "",
    scientific_name: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // For editing, id will be available

  // Fetch fish data if editing
  useEffect(() => {
    if (id) {
      const loadFishData = async () => {
        const data = await fetchFishData(id);
        if (data) {
          setFormData({
            common_name: data.common_name || "",
            scientific_name: data.scientific_name || "",
            description: data.description || "",
          });
        }
      };
      loadFishData();
    }
  }, [id, fetchFishData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateFish(id, formData); // Update existing fish
      } else {
        await createFish(formData); // Create new fish
      }
      navigate("/fish"); // Redirect to fish list
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
