// src/app/about.tsx
"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <div className="container mt-5">
      <header className="about-header text-center mb-5">
        <h1 className="display-4">my-shopについて</h1>
        <p className="lead text-muted">
          「お客様第一」をモットーに、より良いショッピング体験を提供するために全力を尽くしています。
        </p>
      </header>

      <section className="mission-section text-center my-5">
        <h2 className="h4">my-shopのミッション</h2>
        <p className="text-muted">
          最新の技術と豊富な品揃えで、お客様のニーズに応えるオンラインショップを目指しています。
        </p>
      </section>

      <section className="history-section my-5 text-center">
        <h2 className="h4">歴史と沿革</h2>
        <p className="text-muted">
          2024年にスタートし、多くのお客様に支えられながら成長していくことを目指しています。私たちは、お客様との信頼関係を大切にし、共に歩んでいく歴史をこれから築いてまいります。
        </p>
      </section>

      <section className="team-section my-5">
        <h2 className="h4 text-center">チーム紹介</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">CEO - 須田 勝也</h5>
                <p className="card-text text-muted">
                  お客様に最高のサービスを提供するためにリーダーシップを発揮しています。
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">CTO - 須田 貴之</h5>
                <p className="card-text text-muted">
                  最先端のテクノロジーを駆使して、サイトを改善し続けています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section my-5 text-center">
        <h2 className="h4">私たちの価値観</h2>
        <ul className="list-unstyled">
          <li className="mb-2">✅ お客様の満足を第一に考える</li>
          <li className="mb-2">✅ 透明性と誠実さ</li>
          <li className="mb-2">✅ 革新と成長を追求する</li>
        </ul>
      </section>

      <footer className="text-center mt-5 py-4 border-top">
        <p className="mb-0">&copy; 2024 my-shop. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .about-header {
          padding-top: 2rem;
          padding-bottom: 1rem;
        }
        .mission-section,
        .history-section,
        .values-section {
          background-color: #f8f9fa;
          padding: 2rem 0;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
