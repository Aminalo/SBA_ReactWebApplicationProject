import { useState } from "react";
import SizeSelector from "./SizeSelector";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }){
  const [size,setSize] = useState("M");
  const dispatch = useDispatch();

  return (
    <article className="card">
      <div className="img-wrap">
        {/* Image gets a subtle zoom on hover via CSS */}
        <img src={product.image} alt={product.title}/>
      </div>
      <h3 style={{margin:"10px 0 6px"}}>{product.title}</h3>
      <p style={{color:"var(--muted)", margin:"0 0 8px"}}>{product.category}</p>
      <p style={{fontWeight:700, margin:"0 0 8px"}}>${product.price}</p>

      {/* Allow user to choose a size before adding to cart */}
      <SizeSelector value={size} onChange={setSize}/>

      {/* Primary button uses brand brown to match logo */}
      <button
        className="btn"
        onClick={()=> dispatch(addToCart({
          id:product.id, title:product.title, price:product.price, image:product.image, size
        }))}
      >
        Add to Cart
      </button>
    </article>
  );
}