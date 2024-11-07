// src/context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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

  // ページが読み込まれるときにローカルストレージからカートの内容を取得する
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // ローカルストレージに保存されているカート情報をセット
    }
  }, []);

  // カートの変更をローカルストレージに保存する
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); // カートが変更されるたびに保存
    } else {
      localStorage.removeItem("cart"); // カートが空の場合、ローカルストレージから削除
    }
  }, [cart]);

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
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== productId); // 商品を削除
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const productIndex = updatedCart.findIndex(
        (item) => item.id === productId
      );

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = quantity; // 数量を更新
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
