import React, { createContext } from "react";
import useCart from "../hooks/useCart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartHook = useCart(); 

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
};
