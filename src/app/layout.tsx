// src/app/layout.tsx
"use client"; // クライアントサイドコンポーネントとして動作することを指定

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "../context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Stripeの公開可能キーを読み込む
const stripePromise = loadStripe("your-public-key-here");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* ヘッダー */}
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                My Shop
              </a>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" href="/">
                      ホーム
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/checkout">
                      購入
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/products">
                      商品一覧
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/cart">
                      カート
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {/* ToastContainerをレイアウトに追加 */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* CartProviderをページ全体でラップ */}
        <CartProvider>
          {/* Stripe Elementsでラップ */}
          <Elements stripe={stripePromise}>
            <main>{children}</main>
          </Elements>
        </CartProvider>
      </body>
    </html>
  );
}
