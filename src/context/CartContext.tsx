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
  updateQuantity: (productId: number, quantity: number) => void;
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 消費税率と送料を設定
const TAX_RATE = 0.1;
const SHIPPING_FEE = 500;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // カート情報をローカルストレージから読み込む
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // カートの変更をローカルストレージに保存
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // 小計を計算
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // 消費税を計算
  const taxAmount = subtotal * TAX_RATE;

  // 合計金額を計算（小計 + 消費税 + 送料）
  const totalAmount = subtotal + taxAmount + SHIPPING_FEE;

  const addItem = (product: Product) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const existingProductIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
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
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        subtotal,
        taxAmount,
        shippingFee: SHIPPING_FEE,
        totalAmount,
      }}
    >
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
