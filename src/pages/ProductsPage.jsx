import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productsSlice.js";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");

  useEffect(() => { if (status === "idle") dispatch(loadProducts()); }, [status, dispatch]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const visible = useMemo(() => {
    let list = items;
    if (category === "men") list = list.filter(p => p.category === "men's clothing");
    else if (category === "women") list = list.filter(p => p.category === "women's clothing");
    if (sort === "price-asc") list = [...list].sort((a,b)=> a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a,b)=> b.price - a.price);
    return list;
  }, [items, category, sort]);

  return (
    <section>
      <h1>Men & Women Clothing</h1>

      <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", margin:"0 0 16px" }}>
        <div className="chips" role="group" aria-label="Filter by category">
          <button className={`chip ${category==="all"?"active":""}`} onClick={()=>setCategory("all")}>All</button>
          <button className={`chip ${category==="men"?"active":""}`} onClick={()=>setCategory("men")}>Men</button>
          <button className={`chip ${category==="women"?"active":""}`} onClick={()=>setCategory("women")}>Women</button>
        </div>
        <select value={sort} onChange={(e)=>setSort(e.target.value)} aria-label="Sort by price"
          style={{ padding:"10px 12px", borderRadius:12, border:"1px solid #ddd" }}>
          <option value="none">Sort: Default</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      <div className="grid">
        {visible.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {visible.length === 0 && <p>No products match your filters.</p>}
    </section>
  );
}