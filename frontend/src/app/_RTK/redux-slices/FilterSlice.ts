import { createSlice } from "@reduxjs/toolkit";

type TFilter = {
  title?: string;
  minPrice?: number;
  familyCount?: number;
  maxPrice?: number;
};

const initialState: TFilter = {
  title: "",
  minPrice: undefined,
  familyCount: undefined,
  maxPrice: undefined,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { title, minPrice, maxPrice, familyCount } = action.payload;

      if (title !== undefined) state.title = title;
      if (familyCount !== undefined) state.familyCount = familyCount;
      if (minPrice !== undefined) state.minPrice = minPrice;
      if (maxPrice !== undefined) state.maxPrice = maxPrice;
    },
    clearFilter: () => {
      return { ...initialState };
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
