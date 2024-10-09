import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { FishContext } from "./FishContext";

const LocalNameForm = () => {
  const { fishList } = useContext(FishContext); // Access the fish list from context
  const [localNameData, setLocalNameData] = useState({
    fish: "",
    local_name: "",
    region: "",
    size: "",
    color_variation: "",
    growth_stage: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // The id from the URL, used for editing

  useEffect(() => {
    if (id) {
      fetchLocalNameData(); // Fetch the local name data if in edit mode
    }
  }, [id]);

  // Fetch the specific local name data to edit
  const fetchLocalNameData = async () => {
    try {
      const res = await api.get(`api/local-name/${id}/`); // Fetch specific local name by id
      setLocalNameData(res.data);
    } catch (error) {
      console.error("Error fetching local name data:", error);
    }
  };

  // Handle form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/local-name/${id}/`, localNameData);
        console.log("Local name updated!");
      } else {
        await api.post("/api/local-name/", localNameData);
        console.log("Local name added!");
      }
      setLocalNameData({
        fish: "",
        local_name: "",
        region: "",
        size: "",
        color_variation: "",
        growth_stage: "",
      });
      navigate("/local-names");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setLocalNameData({
      ...localNameData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle delete
  const handleDelete = async () => {
    if (id) {
      if (window.confirm("Are you sure you want to delete this local name?")) {
        try {
          await api.delete("/api/local-name/${id}/");
          console.log("Local name deleted!");
          navigate("/local-names");
        } catch (error) {
          console.error("Error deleting local name:", error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{id ? "Update" : "Add"} Local Name</h3>

      <label>Fish</label>
      <select name="fish" value={localNameData.fish} onChange={handleChange}>
        <option value="">Select Fish</option>
        {fishList.map((fish) => (
          <option key={fish.id} value={fish.id}>
            {fish.common_name}
          </option>
        ))}
      </select>

      <label>Local Name</label>
      <input
        type="text"
        name="local_name"
        value={localNameData.local_name}
        onChange={handleChange}
        required
      />

      <label>Region</label>
      <input
        type="text"
        name="region"
        value={localNameData.region}
        onChange={handleChange}
        required
      />

      <label>Size</label>
      <input
        type="text"
        name="size"
        value={localNameData.size}
        onChange={handleChange}
      />

      <label>Color Variation</label>
      <input
        type="text"
        name="color_variation"
        value={localNameData.color_variation}
        onChange={handleChange}
      />

      <label>Growth Stage</label>
      <input
        type="text"
        name="growth_stage"
        value={localNameData.growth_stage}
        onChange={handleChange}
      />

      <button type="submit">
        {id ? "Update Local Name" : "Add Local Name"}
      </button>

      {id && <button onClick={handleDelete}>Delete Local Name</button>}
    </form>
  );
};

export default LocalNameForm;
