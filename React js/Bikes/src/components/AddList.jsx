import React, { useState, useEffect } from "react";

const AddList = ({ onAdd, onUpdate, editingBike }) => {
  const [bike, setBike] = useState({ name: "", color: "", price: "" });

  useEffect(() => {
    if (editingBike) {
      setBike(editingBike);
    }
  }, [editingBike]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBike({ ...bike, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bike.name || !bike.color || !bike.price) return alert("All fields required!");

    if (editingBike) {
      onUpdate(bike);
    } else {
      onAdd(bike);
      setBike({ name: "", color: "", price: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Bike Name"
        value={bike.name}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />

      <input
        type="text"
        name="color"
        placeholder="Color"
        value={bike.color}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={bike.price}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />

      <button type="submit">
        {editingBike ? "Update Bike" : "Add Bike"}
      </button>
    </form>
  );
};

export default AddList;