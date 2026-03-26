import React, { useState, useEffect } from "react";
import AddList from "./components/AddList"; // Make sure file name matches exactly
import BikeList from "./components/BikeList"; 
import { getBikes, addBike, updateBike, deleteBike } from "./api/api"; // Fixed path

function App() {
  const [bikes, setBikes] = useState([]);
  const [editingBike, setEditingBike] = useState(null);

  // Fetch bikes when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBikes();

      setBikes(data);
    };
    fetchData();
  }, []);

  // Add bike
  const handleAdd = async (bike) => {
    const newBike = await addBike(bike);
    setBikes([...bikes, newBike]);
  };

  // Update bike
  const handleUpdate = async (bike) => {
    const updated = await updateBike(bike.id, bike);
    setBikes(bikes.map((b) => (b.id === bike.id ? updated : b)));
    setEditingBike(null);
  };

  // Delete bike
  const handleDelete = async (id) => {
    await deleteBike(id);
    setBikes(bikes.filter((b) => b.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏍️ Bike CRUD Project</h1>

      {/* Add / Edit Form */}
      <AddList
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingBike={editingBike}
      />

      {/* Bike List Table */}
      <BikeList
        bikes={bikes}
        onEdit={setEditingBike}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;