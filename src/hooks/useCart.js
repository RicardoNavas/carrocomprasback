import { useState, useEffect } from "react";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  checkout,
} from "../servicios/carroServicios.js";

export default function useCart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    const { data } = await getCart();
    setCart(data);
  }

  const add = async (id, qty = 1) => {
    await addToCart(id, qty);
    await loadCart();
  };

  const update = async (id, qty) => {
    if (qty <= 0) {
      await removeFromCart(id);
    } else {
      await updateQuantity(id, qty);
    }
    await loadCart();
  };

  const remove = async (id) => {
    await removeFromCart(id);
    await loadCart();
  };

  const clear = async () => {
    await clearCart();
    await loadCart();
  };

  const finish = async () => {
    const { data } = await checkout();
    await clear();
    return data;
  };

  return { cart, add, update, remove, clear, finish };
}
