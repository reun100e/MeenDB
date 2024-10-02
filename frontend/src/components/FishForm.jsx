import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function FishForm() {
  const [formData, setFormData] = useState({
    common_name: "",
    scientific_name: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // For editing, id will be available

  useEffect(() => {
    if (id) {
      fetchFishData();
    }
  }, [id]);

  const fetchFishData = async () => {
    try {
      const res = await api.get(`api/fish/${id}/`);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching fish data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`api/fish/${id}/`, formData); // Update existing
      } else {
        await api.post("api/fish/", formData); // Create new
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
