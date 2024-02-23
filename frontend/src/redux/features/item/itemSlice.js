import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list:[],
  totalPages: 0
}

export const itemSlice = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    setItems: (state, action) => {
      // console.log(state, action);
      state.list = action.payload.products;
      state.totalPages = action.payload.total;
    },
    // removeItem: (state, action) => {
    //   console.log(state);
    // },
  },
});

// Action creators are generated for each case reducer function

export const { setItems } = itemSlice.actions

export default itemSlice.reducer