import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Tus páginas y componentes
import PaginaInicio from "./contenedores/PaginaPrincipal";
import PaginaCarro from "./contenedores/PaginaCarro";
import { CartContext } from "./context/CarroContexto";

export default function App() {
  // obtenemos carrito del contexto global
  const { cart } = useContext(CartContext);

  return (
    <Router>
      {/* NAVBAR */}
      <nav
        style={{
          padding: 10,
          display: "flex",
          gap: 20,
          borderBottom: "1px solid #ccc",
          marginBottom: 20,
        }}
      >
        <Link to="/">🏠 Inicio</Link>
        <Link to="/carrito">
          🛒 Carrito ({cart?.items?.length ?? 0}) — Total: ${cart?.total ?? 0}
        </Link>
      </nav>

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/carrito" element={<PaginaCarro />} />
      </Routes>
    </Router>
  );
}
