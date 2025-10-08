import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // Add new item or increase qty if same id+size exists
    addToCart(state, {payload}){
      const { id, size } = payload;
      const i = state.findIndex(p => p.id===id && p.size===size);
      if(i>=0) state[i].qty = (state[i].qty||1) + 1;
      else state.push({ ...payload, qty: 1 });
    },
    // Remove a specific size of a product
    removeFromCart(state, {payload:{id,size}}){
      return state.filter(p => !(p.id===id && p.size===size));
    },
    // Update quantity with a minimum of 1
    setQty(state, {payload:{id,size,qty}}){
      const item = state.find(p => p.id===id && p.size===size);
      if(item) item.qty = Math.max(1, Number(qty) || 1);
    },
    // Empty the cart
    clearCart(){ return []; }
  }
});

export const { addToCart, removeFromCart, setQty, clearCart } = slice.actions;
export default slice.reducer;