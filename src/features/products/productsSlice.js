import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAll } from "../../api/products";

// Load products from API on demand
export const loadProducts = createAsyncThunk("products/load", fetchAll);

const slice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadProducts.pending, (s)=>{ s.status="loading"; })
     .addCase(loadProducts.fulfilled, (s,a)=>{ 
        s.status="succeeded";
        // Keep only men's and women's clothing categories
        s.items = (a.payload || []).filter(p =>
          p.category === "men's clothing" || p.category === "women's clothing"
        );
     })
     .addCase(loadProducts.rejected, (s,a)=>{ s.status="failed"; s.error=a.error.message; });
  }
});

export default slice.reducer;