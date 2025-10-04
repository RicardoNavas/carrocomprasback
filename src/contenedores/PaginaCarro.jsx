import React, { useState, useContext } from "react";
import { CartContext } from "../context/CarroContexto";
import ProductModal from "../componentes/ModalProducto";

export default function PaginaCarro() {
  const { cart, update, remove, clear, finish } = useContext(CartContext);
  const [selected, setSelected] = useState(null);

  if (!cart || !cart.items) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>🛒 Carrito de compras</h2>

      {cart.items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.productoId}>
                  <td
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => setSelected(item)}
                  >
                    {item.nombre}
                  </td>
                  <td>
                    <button onClick={() => update(item.productoId, item.cantidad - 1)}>-</button>
                    <span style={{ margin: "0 8px" }}>{item.cantidad}</span>
                    <button onClick={() => update(item.productoId, item.cantidad + 1)}>+</button>
                  </td>
                  <td>${item.precioUnitario.toFixed(2)}</td>
                  <td>${(item.precioUnitario * item.cantidad).toFixed(2)}</td>
                  <td>
                    <button onClick={() => remove(item.productoId)}>❌ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 20 }}>Total: ${cart.total.toFixed(2)}</h3>

          <div style={{ marginTop: 16 }}>
            <button onClick={clear} style={{ marginRight: 8 }}>🧹 Vaciar carrito</button>
            <button onClick={finish}>✅ Finalizar compra</button>
          </div>
        </>
      )}

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
