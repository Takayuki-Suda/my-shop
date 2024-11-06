// src/context/CartContext.tsx
import React, { createContext, useContext, useState } from "react";

// 商品情報の型定義
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

// CartContextの型定義
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeItem: (productId: number) => void; // 型を明示的に指定
};

// CartContextの作成
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // 商品をカートに追加する関数
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // 商品をカートから削除する関数
  const removeItem = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// useCartフックの作成
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
