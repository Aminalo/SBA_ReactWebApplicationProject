import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import SizeSelector from "./SizeSelector.jsx";

export default function ProductCard({ product }) {
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false); // optional feedback
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size
    }));
    //  (no redirect)
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card">
      <div className="img-wrap">
        <img src={product.image} alt={product.title} />
      </div>
      <h3 style={{ margin: "10px 0 6px" }}>{product.title}</h3>
      <p style={{ color: "var(--muted)", margin: "0 0 8px" }}>{product.category}</p>
      <p style={{ fontWeight: 700, margin: "0 0 8px" }}>${product.price}</p>
      <SizeSelector value={size} onChange={setSize} />

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="btn" onClick={handleAdd}>Add to Cart</button>
        {added && <span style={{ fontSize: 12, color: "var(--brand-brown)" }}>Added!</span>}
      </div>
    </article>
  );
}