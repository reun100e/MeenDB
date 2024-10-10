import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalName } from "./contexts/LocalNameContext";
import { useFish } from "./contexts/FishContext";

const LocalNameForm = () => {
  const { fishList } = useFish(); // Access fish list from context
  const {
    fetchLocalNameData,
    saveLocalNameData,
    deleteLocalName,
    localNameData,
  } = useLocalName(); // Use local name context
  const [formData, setFormData] = useState({
    fish: "",
    local_name: "",
    region: "",
    size: "",
    color_variation: "",
    growth_stage: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // ID for editing

  useEffect(() => {
    if (id) {
      fetchLocalNameData(id); // Fetch local name data if editing
    }
  }, [id, fetchLocalNameData]);

  useEffect(() => {
    if (id && localNameData) {
      setFormData(localNameData); // Update formData when localNameData changes
    }
  }, [localNameData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveLocalNameData(formData, id);
    navigate("/local-names");
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this local name?")) {
      await deleteLocalName(id);
      navigate("/local-names");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{id ? "Update" : "Add"} Local Name</h3>

      <label>Fish</label>
      <select name="fish" value={formData.fish} onChange={handleChange}>
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
        value={formData.local_name}
        onChange={handleChange}
        required
      />

      <label>Region</label>
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        required
      />

      <label>Size</label>
      <input
        type="text"
        name="size"
        value={formData.size}
        onChange={handleChange}
      />

      <label>Color Variation</label>
      <input
        type="text"
        name="color_variation"
        value={formData.color_variation}
        onChange={handleChange}
      />

      <label>Growth Stage</label>
      <input
        type="text"
        name="growth_stage"
        value={formData.growth_stage}
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
