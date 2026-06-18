import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/complaints';

// Async Thunks
export const fetchComplaints = createAsyncThunk(
  'complaints/fetchComplaints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch complaints'
      );
    }
  }
);

export const addComplaint = createAsyncThunk(
  'complaints/addComplaint',
  async (complaintData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, complaintData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to submit complaint'
      );
    }
  }
);

export const updateComplaint = createAsyncThunk(
  'complaints/updateComplaint',
  async ({ id, complaintData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, complaintData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update complaint'
      );
    }
  }
);

export const deleteComplaint = createAsyncThunk(
  'complaints/deleteComplaint',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to delete complaint'
      );
    }
  }
);

const initialState = {
  complaints: [],
  loading: false,
  error: null,
  // Search and filter criteria
  searchQuery: '',
  statusFilter: '', // 'Pending', 'In Progress', 'Resolved', or '' (All)
};

const complaintSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Complaints
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Complaint
      .addCase(addComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints.push(action.payload);
      })
      .addCase(addComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Complaint
      .addCase(updateComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComplaint.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.complaints.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.complaints[index] = action.payload;
        }
      })
      .addCase(updateComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Complaint
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComplaint.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = state.complaints.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, setStatusFilter, clearError } = complaintSlice.actions;

export default complaintSlice.reducer;
