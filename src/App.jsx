import { Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import CartPage from "./pages/CartPage.jsx";
// 👉 Vite: on importe le SVG, on n’utilise pas src="/src/…"
import wordmark from "./assets/noirceur-wordmark.svg";

export default function App() {
  return (
    <>
      <header className="site">
        <div className="bar">
          <div className="brand">
            <Link to="/"><img src={wordmark} alt="Noirceur" /></Link>
          </div>
          {/* plus de bouton Cart dans le header */}
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