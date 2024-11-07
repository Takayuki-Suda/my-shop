// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

interface CartContextType {
  cart: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
