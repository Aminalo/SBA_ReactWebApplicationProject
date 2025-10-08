import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setQty, clearCart } from "../features/cart/cartSlice";

export default function CartDrawer(){
  const cart = useSelector(s=>s.cart);
  const dispatch = useDispatch();

  // Hide drawer when cart is empty
  if(!cart.length) return null;

  const total = cart.reduce((sum,i)=> sum + i.price*(i.qty||1), 0).toFixed(2);

  return (
    <aside style={{
      position:"fixed", right:16, bottom:16, width:340, maxHeight:"70vh",
      background:"#fff", border:"1px solid #eee", borderRadius:16, padding:16,
      boxShadow:"0 12px 32px rgba(0,0,0,.18)", overflowY:"auto", zIndex:50
    }}>
      <h3>Cart</h3>

      {cart.map(item=>(
        <div key={`${item.id}-${item.size}`} style={{display:"flex",gap:8,margin:"10px 0"}}>
          <img src={item.image} alt="" style={{width:54,height:54,objectFit:"contain"}} />
          <div style={{flex:1}}>
            <div style={{fontWeight:600}}>{item.title}</div>
            <div style={{fontSize:12,color:"var(--muted)"}}>Size {item.size}</div>

            {/* Update quantity inline */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
              <input
                type="number" min="1" value={item.qty||1}
                onChange={(e)=> dispatch(setQty({id:item.id,size:item.size,qty:+e.target.value}))}
                style={{width:64,padding:6,borderRadius:8,border:"1px solid #ddd"}}
              />
              <button className="btn ghost"
                onClick={()=> dispatch(removeFromCart({id:item.id,size:item.size}))}
              >Remove</button>
            </div>
          </div>

          {/* Line total */}
          <div style={{fontWeight:700}}>${(item.price*(item.qty||1)).toFixed(2)}</div>
        </div>
      ))}

      {/* Footer with total and actions */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12}}>
        <strong>Total</strong><strong>${total}</strong>
      </div>
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button className="btn ghost" onClick={()=>dispatch(clearCart())}>Clear</button>
        <button className="btn">Checkout</button>
      </div>
    </aside>
  );
}