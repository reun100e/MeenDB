import React, { useState, useEffect } from "react";
import api from "../api";

function FishPhotoList() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await api.get("api/fish-photos/");
      setPhotos(res.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError("Failed to fetch fish photos."); // Handle errors gracefully
      setLoading(false); // Ensure loading state is updated even if there's an error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Fish Photos</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.image} alt={photo.description} />
            <p>{photo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FishPhotoList;
