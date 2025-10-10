import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
// 👉 Vite: import the SVG file 
import wordmark from "./assets/noirceur-wordmark.svg";
import { useSelector } from "react-redux";

export default function App() {
  // Total quantity across all cart items
  const totalQty = useSelector((s) =>
    s.cart.reduce((sum, i) => sum + (i.qty || 1), 0)
  );

  return (
    <>
      <header className="site">
        <div className="bar">
          <div className="brand">
            <Link to="/"><img src={wordmark} alt="Noirceur" /></Link>
          </div>

          {}
          <Link to="/cart" className="btn ghost" aria-label="Open cart">
            Cart {totalQty > 0 && <span className="badge">{totalQty}</span>}
          </Link>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </>
  );
}