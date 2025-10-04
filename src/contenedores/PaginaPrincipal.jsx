import React, { useEffect, useState } from "react";
import { getCategories } from "../servicios/servicioProductos";
import ProductCard from "../componentes/FormProductos";
import useCart from "../hooks/useCart";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { add, cart } = useCart(); 
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
   
    const term = q.trim().toLowerCase();
    if (!term) return setFiltered(products);
    setFiltered(products.filter(p =>
      (p.cproNombre || "").toLowerCase().includes(term) ||
      (p.cproDescripcion || "").toLowerCase().includes(term)
    ));
  }, [q, products]);

  async function loadProducts() {
    try {
      setLoading(true);
      const { data } = await getCategories();
     
      const all = (data || []).flatMap(c => c.catalogoProd || []);
      setProducts(all);
      setFiltered(all);
    } catch (err) {
      console.error("Error cargando productos", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(product, qty = 1) {
    try {
      setAddingId(product.cproId);
      
      const price = product.precio ?? product.price ?? product.cproPrecio ?? 10.0;

      await add(product.cproId, qty);
      
      alert(`${product.cproNombre} agregado al carrito (${qty}) — $${Number(price).toFixed(2)}`);
    } catch (err) {
      console.error("Error agregando al carrito", err);
      alert("Error al agregar al carrito");
    } finally {
      setAddingId(null);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Catálogo</h2>

      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={() => { setQ(""); }}>Limpiar</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Items en carrito:</strong> {cart?.items?.length ?? 0} — Total: ${cart?.total ?? 0}
      </div>

      {loading ? <p>Cargando productos...</p> : (
        filtered.length === 0 ? (
          <p>No se encontraron productos</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {filtered.map(p => (
              <ProductCard
                key={p.cproId}
                product={p}
                onAdd={(prod, qtty) => handleAdd(prod, qtty)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
