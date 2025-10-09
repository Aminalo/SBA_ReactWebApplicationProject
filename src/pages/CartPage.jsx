import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQty, clearCart } from "../features/cart/cartSlice.js";
import { Link } from "react-router-dom";

export default function CartPage() {
  const cart = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0).toFixed(2);

  if (!cart.length) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Continue shopping</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={`${item.id}-${item.size}`}
          style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}
        >
          <img src={item.image} alt="" style={{ width: 64, height: 64, objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Size {item.size}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
              <label style={{ fontSize: 12 }}>Qty</label>
              <input
                type="number"
                min="1"
                value={item.qty || 1}
                onChange={(e) => dispatch(setQty({ id: item.id, size: item.size, qty: +e.target.value }))}
                style={{ width: 72, padding: 6, border: "1px solid #ddd", borderRadius: 8 }}
              />
              <button className="btn ghost" onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}>
                Remove
              </button>
            </div>
          </div>
          <div style={{ fontWeight: 700 }}>${(item.price * (item.qty || 1)).toFixed(2)}</div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <button className="btn ghost" onClick={() => dispatch(clearCart())}>Clear cart</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <strong>Total: ${total}</strong>
          <button className="btn">Checkout</button>
        </div>
      </div>
    </section>
  );
}