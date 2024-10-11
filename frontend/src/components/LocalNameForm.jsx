import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalName } from "./contexts/LocalNameContext";
import { useFish } from "./contexts/FishContext";

function LocalNameForm() {
  const { fishList } = useFish(); // Access fish list from context
  const {
    fetchLocalNameData,
    createLocalName,
    updateLocalName,
    localNameList,
    localNameCache,
  } = useLocalName(); // Use local name context

  const [formData, setFormData] = useState({
    fish: "",
    local_name: "",
    region: "",
    size: "",
    color_variation: "",
    growth_stage: "",
  });
  const [originalData, setOriginalData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams(); // ID for editing

  // Fetch local name data if editing, or use cached data
  useEffect(() => {
    if (id) {
      const cachedLocalName = localNameCache[id]; // Check cache first
      if (cachedLocalName) {
        setFormData(cachedLocalName);
        setOriginalData(cachedLocalName);
      } else {
        const loadLocalNameData = async () => {
          const data = await fetchLocalNameData(id);
          if (data) {
            setFormData(data); // Update formData when localNameData changes
            setOriginalData(data);
          }
        };
        loadLocalNameData();
      }
    }
  }, [id, localNameCache, fetchLocalNameData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Check if data has changed before updating
        const hasChanged = Object.keys(formData).some(
          (key) => formData[key] !== originalData[key]
        );
        if (hasChanged) {
          await updateLocalName(id, formData);
          console.log("Changes detected. Updating local name.");
        } else {
          console.log("No changes detected. Skipping update.");
          navigate("/local-names");
          return;
        }
      } else {
        // Check if a local name with the same name and region already exists
        const existingLocalName = localNameList.find(
          (ln) =>
            ln.local_name.toLowerCase() === formData.local_name.toLowerCase() &&
            ln.region.toLowerCase() === formData.region.toLowerCase()
        );
        if (existingLocalName) {
          console.log("A local name with this name and region already exists.");
          // Should show an error message to the user that the local name already exists
          return;
        }
        await createLocalName(formData);
      }
      navigate("/local-names");
    } catch (error) {
      console.error("Error saving local name data:", error);
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
    <div>
      <h2>{id ? "Edit Local Name" : "Add Local Name"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fish">Fish</label>
          <select
            id="fish"
            name="fish"
            value={formData.fish}
            onChange={handleChange}
            required
          >
            <option value="">Select Fish</option>
            {fishList.map((fish) => (
              <option key={fish.id} value={fish.id}>
                {fish.common_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="local_name">Local Name</label>
          <input
            type="text"
            id="local_name"
            name="local_name"
            value={formData.local_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="color_variation">Color Variation</label>
          <input
            type="text"
            id="color_variation"
            name="color_variation"
            value={formData.color_variation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="growth_stage">Growth Stage</label>
          <input
            type="text"
            id="growth_stage"
            name="growth_stage"
            value={formData.growth_stage}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? "Update" : "Add"} Local Name</button>
      </form>
    </div>
  );
}

export default LocalNameForm;
