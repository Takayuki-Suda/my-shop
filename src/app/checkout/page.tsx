// src/app/checkout/page.tsx
"use client"; // クライアントサイドコンポーネントにする

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
      body: JSON.stringify({ amount: 1000 }), // 商品の価格
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
