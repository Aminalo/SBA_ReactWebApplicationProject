import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function ProductsPage(){
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(s => s.products);

  // Kick off data loading on first render
  useEffect(()=>{ if(status==="idle") dispatch(loadProducts()); },[status,dispatch]);

  if(status==="loading") return <p>Loading…</p>;
  if(status==="failed") return <p>Error: {error}</p>;

  return (
    <section>
      <h1>Men & Women Clothing</h1>
      <div className="grid">
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}