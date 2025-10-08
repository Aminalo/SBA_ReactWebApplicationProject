import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.products);

  // Local UI state for category filter
  const [category, setCategory] = useState("all"); // 'all' | 'men' | 'women'

  useEffect(() => {
    if (status === "idle") dispatch(loadProducts());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  // Filter by category
  const filtered = items.filter((p) => {
    if (category === "all") return true;
    if (category === "men") return p.category === "men's clothing";
    if (category === "women") return p.category === "women's clothing";
    return true;
  });

  return (
    <section>
      <h1>Men & Women Clothing</h1>

      {}
      <div className="chips" role="group" aria-label="Filter by category">
        <button
          type="button"
          className={`chip ${category === "all" ? "active" : ""}`}
          onClick={() => setCategory("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`chip ${category === "men" ? "active" : ""}`}
          onClick={() => setCategory("men")}
        >
          Men
        </button>
        <button
          type="button"
          className={`chip ${category === "women" ? "active" : ""}`}
          onClick={() => setCategory("women")}
        >
          Women
        </button>
      </div>

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}