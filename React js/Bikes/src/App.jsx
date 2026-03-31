import React, { useState, useEffect } from "react";
import AddList from "./components/AddList";
import BikeList from "./components/BikeList";
import { getBikes, addBike, updateBike, deleteBike } from "./api/api";

function App() {
  const [bikes, setBikes] = useState([]);
  const [editingBike, setEditingBike] = useState(null);
  const [error, setError] = useState(null);

  // Fetch bikes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBikes();
        setBikes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load bikes. Please ensure the API server is running.");
      }
    };

    fetchData();
  }, []);

  // Add Bike
  const handleAdd = async (bike) => {
    const newBike = await addBike(bike);
    setBikes([...bikes, newBike]);
  };

  // Update Bike
  const handleUpdate = async (bike) => {
    const updated = await updateBike(bike);
    setBikes(bikes.map((b) => (b.id === bike.id ? updated : b)));
    setEditingBike(null);
  };

  // Delete Bike
  const handleDelete = async (id) => {
    await deleteBike(id);
    setBikes(bikes.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1>Bike CRUD App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <AddList
        onAdd={handleAdd}
        editingBike={editingBike}
        onUpdate={handleUpdate}
      />

      <BikeList
        bikes={bikes}
        onEdit={setEditingBike}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;