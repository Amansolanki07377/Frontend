import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserGet from "./Component/UserGet";
import UserAdd from "./Component/UserAdd";
import Header from "./Component/Header";
import Editform from "./Component/Editform";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UserGet />} />
        <Route path="/add" element={<UserAdd />} />
        <Route path="/edit/:id" element={<Editform />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;