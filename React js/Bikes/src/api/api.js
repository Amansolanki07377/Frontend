const API_URL = "http://localhost:3000/bikes";

export const getBikes = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addBike = async (bike) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bike),
  });
  return res.json();
};

export const updateBike = async (id, bike) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bike),
  });
  return res.json();
};

export const deleteBike = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};