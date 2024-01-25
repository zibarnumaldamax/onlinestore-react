import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseLink } from './baseLink';

export const fetchCategories = createAsyncThunk(
  'caterories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseLink}/categories/all`);
      if (!response.ok) {
        throw new Error('Server problem');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'caterories',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.status = 'resolve';
      })
      .addCase(fetchCategories.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload;
      });
  },
});

export default categoriesSlice.reducer;
