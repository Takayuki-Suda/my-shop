"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"; // Header コンポーネントをインポート

const stripePromise = loadStripe(
  "pk_test_51QIR1sI7Vp8slT6TGoeDuhyUyzyemAZuvfLU1Rau5jZzCGJ2UO3uGj71DVcOWYua5raAcPQChlErobf0R2ePYtNt00FyWzhyvy"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* Header コンポーネントを配置 */}
        <Header />

        <ToastContainer position="top-right" autoClose={3000} />

        <CartProvider>
          <Elements stripe={stripePromise}>
            <main>{children}</main>
          </Elements>
        </CartProvider>
      </body>
    </html>
  );
}
