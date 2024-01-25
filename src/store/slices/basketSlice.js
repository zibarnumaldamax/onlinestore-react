import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseLink } from './baseLink';

const defaultState = JSON.parse(localStorage.getItem('basket')) ?? [];

const writeToLocalStorage = basket =>
  localStorage.setItem('basket', JSON.stringify(basket));

export const fetchBasketOrder = createAsyncThunk(
  'basket/fetchBasketOrder',
  async (order, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${baseLink}/order/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error(`An error has occured: ${response.statusText}`);
      }
      const data = await response.json();
      dispatch(clear());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    data: defaultState,
  },
  reducers: {
    addToBasket: (state, action) => {
      const product = state.data.find(({ id }) => id === action.payload);
      if (product) {
        product.count++;
      } else {
        state.data.push({ id: action.payload, count: 1 });
      }
      writeToLocalStorage(state.data);
    },
    increment: (state, action) => {
      state.data.find(({ id }) => id === action.payload).count++;
      writeToLocalStorage(state.data);
    },
    decrement: (state, action) => {
      const target = state.data.find(({ id }) => id === action.payload);
      target.count--;
      if (target.count === 0) {
        state.data = state.data.filter(el => el !== target);
      }
      writeToLocalStorage(state.data);
    },
    remove: (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
      writeToLocalStorage(state.data);
    },
    clear: state => {
      state.data = [];
      writeToLocalStorage(state.data);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBasketOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchBasketOrder.fulfilled, state => {
        state.status = 'resolve';
      })
      .addCase(fetchBasketOrder.rejected, (state, { payload }) => {
        state.status = 'rejected';
        state.error = payload;
      });
  },
});

export const { addToBasket, increment, decrement, remove, clear } =
  basketSlice.actions;

export default basketSlice.reducer;
