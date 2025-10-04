import React from "react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 8, width: 400 }}>
        <h3>{product.nombre}</h3>
        <p><strong>Cantidad:</strong> {product.cantidad}</p>
        <p><strong>Precio unitario:</strong> ${product.precioUnitario.toFixed(2)}</p>
        <p><strong>Subtotal:</strong> ${(product.precioUnitario * product.cantidad).toFixed(2)}</p>
        <button onClick={onClose} style={{ marginTop: 12 }}>Cerrar</button>
      </div>
    </div>
  );
}