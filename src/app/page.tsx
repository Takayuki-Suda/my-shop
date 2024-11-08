"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    router.push("/products");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">ようこそ、my-shopへ！</h1>
        <p className="hero-subtitle">
          あなたにぴったりの素晴らしい商品を揃えています。
        </p>
        <button className="cta-button" onClick={handleClick}>
          ショッピングを始める
        </button>
      </header>

      <section className="about-section">
        <h2 className="section-title">my-shopを選ぶ理由</h2>
        <div className="features">
          <div className="feature">
            <h3>品質の高い商品</h3>
            <p>私たちは、厳選された最高品質の商品だけを提供しています。</p>
          </div>
          <div className="feature">
            <h3>世界中へ配送</h3>
            <p>どこにいても、世界中どこへでもお届けします。</p>
          </div>
          <div className="feature">
            <h3>サポート体制</h3>
            <p>24時間体制でサポートを提供し、あなたの疑問にお答えします。</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 私たちのショップ. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .home-container {
          font-family: "Roboto", sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          color: #333;
        }

        .hero-section {
          background-color: #1d1d1f;
          color: white;
          text-align: center;
          padding: 50px 20px;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 30px;
          opacity: 0.8;
        }

        .cta-button {
          background-color: #ff6f61;
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 30px;
          transition: background-color 0.3s ease;
        }

        .cta-button:hover {
          background-color: #e14d42;
        }

        .about-section {
          padding: 50px 20px;
          background-color: #f9f9f9;
          text-align: center;
        }

        .section-title {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        .features {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }

        .feature {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .feature h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .footer {
          text-align: center;
          padding: 20px;
          background-color: #1d1d1f;
          color: white;
        }

        @media (max-width: 768px) {
          .features {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
