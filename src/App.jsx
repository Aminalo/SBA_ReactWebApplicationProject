import { Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import ProductsPage from "./pages/ProductsPage";
import CartDrawer from "./components/CartDrawer";

export default function App(){
  return (
    <>
      {/* Site header with Noirceur wordmark */}
      <header className="site">
        <div className="bar">
          <div className="brand">
            {}
            <img src="/src/assets/noirceur-wordmark.svg" alt="Noirceur" />
          </div>
          <Link to="/" className="btn ghost">Cart</Link>
        </div>
      </header>

      {}
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage/>} />
        </Routes>
      </main>

      {}
      <CartDrawer/>
    </>
  );
}