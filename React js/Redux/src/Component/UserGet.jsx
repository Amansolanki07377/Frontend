import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletedata, readUser } from "../Slice/UserSlice";
import { Link } from "react-router-dom";

function UsersGet() {
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(
    (state) => state.userDetails
  );

  useEffect(() => {
    dispatch(readUser());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h2 className="text-center m-0">User List</h2>
        </div>

        <div className="card-body">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {user &&
                user.map((u) => (
                  <tr key={u.id} className="text-center">
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.gender}</td>
                    <td>
                      <button className="btn btn-success ms-2">View</button>
                      <Link to={`/edit/${u.id}`} className="btn btn-primary ms-2" >Edit</Link>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => dispatch(deletedata(u.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersGet;