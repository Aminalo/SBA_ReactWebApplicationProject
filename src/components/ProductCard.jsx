import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
import { useNavigate } from "react-router-dom";
import SizeSelector from "./SizeSelector.jsx";

export default function ProductCard({ product }) {
  const [size, setSize] = useState("M");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size
    }));
    navigate("/cart");
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
      <button className="btn" onClick={handleAdd}>Add to Cart</button>
    </article>
  );
}