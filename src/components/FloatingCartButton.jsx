import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FloatingCartButton(){
  const count = useSelector((s) => s.cart.reduce((n,i)=> n + (i.qty||1), 0));
  const navigate = useNavigate();
  if (!count) return null;

  return (
    <button
      className="btn"
      onClick={() => navigate("/cart")}
      style={{
        position:"fixed", right:16, bottom:16, zIndex:60,
        boxShadow:"0 10px 24px rgba(0,0,0,.15)"
      }}
      aria-label="View cart"
      title="View cart"
    >
      View Cart ({count})
    </button>
  );
}