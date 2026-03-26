//edit form
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editdata } from "../Slice/UserSlice";
import { useNavigate, useParams } from "react-router-dom";

function UserEdit() {
  const { id } = useParams();
    const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const redirect = useNavigate();

  const [form, setform] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    if (id && user) {
      const singleUser = user.find((ele) => ele.id === id);
      if (singleUser) {
        setform(singleUser);
      }
    }
  }, [id, user]);

    const getchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const submitdata = (e) => {
    e.preventDefault();
    dispatch(editdata({ id, data: form }));
    setform({ name: "", email: "", gender: "", password: "" });
    redirect("/");
  };
    return (
        <div className="container mt-5 d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-header bg-dark text-white">
          <h2 className="text-center m-0">Edit User</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submitdata}>
            <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={getchange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
            onChange={getchange}
            className="form-control mb-2"
        /> 
        <div className="mb-2">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={getchange}
            />{" "}Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={getchange}
            className="ms-3"
            />{" "}Female
        </div> 
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={getchange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary w-100">Update</button>
          </form>
        </div>
      </div>
    </div>
    );
}

export default UserEdit;
//edit data in slice 
