"use client"; // クライアントサイドコンポーネントにする

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCart } from "../../context/CartContext"; // カートコンテキストをインポート

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { subtotal, taxAmount, shippingFee, totalAmount } = useCart(); // カートの合計情報を取得

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("カード情報の取得に失敗しました。");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }), // 合計金額を送信
    });

    const { clientSecret } = await res.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.log("Payment failed", error);
      alert("決済に失敗しました。もう一度お試しください。");
    } else {
      console.log("Payment succeeded", paymentIntent);
      alert("決済が完了しました！");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>商品購入ページ</h2>

      {/* 合計金額の表示 */}
      <div className="order-summary my-4">
        <h4>注文概要</h4>
        <p>小計: ¥{subtotal.toLocaleString()}</p>
        <p>消費税: ¥{taxAmount.toLocaleString()}</p>
        <p>送料: ¥{shippingFee.toLocaleString()}</p>
        <h3>合計: ¥{totalAmount.toLocaleString()}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="card-element" className="form-label">
            カード情報
          </label>
          <CardElement id="card-element" />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !stripe}
        >
          {loading ? "処理中..." : "支払いを完了する"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
