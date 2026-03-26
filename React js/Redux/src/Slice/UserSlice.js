import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";

// ✅ Get users
export const readUser = createAsyncThunk(
  "readUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add user
export const addData = createAsyncThunk(
  "addData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/users", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  //delete user
export const deletedata =createAsyncThunk(
    'deletedata',async(Id,{rejectWithValue})=>{
        try {
            await axios.delete(`http://localhost:3000/users/${Id}`)
            return Id;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

  // ✅ Edit user
  export const editdata = createAsyncThunk(
    "editdata",async({id,data},{rejectWithValue})=>{
      try {
        await axios.put(`http://localhost:3000/users/${id}`,data)
        return { id, data };  
      } catch (error) {
        return rejectWithValue(error.message)
      }
    }
  );


const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    loading: false,
    user: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder
      // Read user
      .addCase(readUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(readUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add user
      .addCase(addData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // delete user
      .addCase(deletedata.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletedata.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter((u) => 
            u.id !== action.payload);
      })
      .addCase(deletedata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     


      // Edit user

      .addCase(editdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(editdata.fulfilled, (state, action) => {
        state.loading = false;
        const { id, data } = action.payload;
        state.user = state.user.map((u) => (u.id === id ? { ...u, ...data } : u));
      })
      .addCase(editdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


      

  },
});
export const { userFullfild, userPending, userRejected } = userSlice.actions

export default userSlice.reducer;