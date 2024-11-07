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
    setCart((prev) => {
      const updatedCart = [...prev]; // カートをコピー

      // すでにカートに同じ商品があるかを探す
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // 既存の商品があれば、数量を+1
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
      } else {
        // 新しい商品は数量1で追加
        updatedCart.push({ ...product, quantity: 1 });
      }

      return updatedCart; // 更新したカートを返す
    });
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
