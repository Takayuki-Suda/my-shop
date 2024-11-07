// src/context/CartContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

interface CartContextType {
  cart: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void; // 数量変更機能を追加
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart;
    });
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const productIndex = updatedCart.findIndex(
        (item) => item.id === productId
      );

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = quantity;
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity }}>
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
