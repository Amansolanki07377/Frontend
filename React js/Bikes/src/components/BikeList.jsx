import React from "react";

const BikeList = ({ bikes, onEdit, onDelete }) => {
  if (!bikes || !Array.isArray(bikes) || bikes.length === 0) {
    return <p style={{ marginTop: "20px" }}>No bikes available. Please add one!</p>;
  }

  return (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Color</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {bikes.map((bike) => (
          <tr key={bike.id}>
            <td>{bike.id}</td>
            <td>{bike.name}</td>
            <td>{bike.color}</td>
            <td>{bike.price}</td>
            <td>
              <button onClick={() => onEdit(bike)}>Edit</button>
              <button onClick={() => onDelete(bike.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BikeList;