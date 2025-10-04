import React from "react";

export default function FormProductos({ product, onAdd }) {
  
  const price = product.precio ?? product.price ?? product.cproPrecio ?? 10.0;
  const imageUrl = product.imagen || "https://via.placeholder.com/300x180?text=No+Image";

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%"
    }}>
      <div>
        <img src={imageUrl} alt={product.cproNombre} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6 }} />
        <h4 style={{ margin: "8px 0" }}>{product.cproNombre}</h4>
        <p style={{ minHeight: 40 }}>{product.cproDescripcion}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
        <strong>${Number(price).toFixed(2)}</strong>
        <button onClick={() => onAdd(product, 1)}>Agregar</button>
      </div>
    </div>
  );
}
