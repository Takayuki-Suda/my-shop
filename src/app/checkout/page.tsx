"use client"; // クライアントサイドコンポーネントにする

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCart } from "../../context/CartContext"; // カートコンテキストをインポート

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(10000); // 所持金額を10,000円で初期化
  const stripe = useStripe();
  const elements = useElements();
  const { subtotal, taxAmount, shippingFee, totalAmount } = useCart(); // カートの合計情報を取得

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    console.log("支払い処理開始");

    if (!stripe || !elements) {
      console.log("StripeまたはElementsが未ロードです");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("カード情報の取得に失敗しました");
      alert("カード情報の取得に失敗しました。");
      setLoading(false);
      return;
    }

    console.log("カード情報が取得されました");

    // 支払い要求の作成
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }), // 合計金額を送信
    });

    if (!res.ok) {
      console.error("PaymentIntentの作成に失敗しました", await res.text()); // エラーメッセージを表示
      alert("決済の準備に失敗しました。");
      setLoading(false);
      return;
    }

    const { clientSecret } = await res.json();
    console.log("取得したclientSecret:", clientSecret);

    // 支払い確認
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("決済エラー:", error); // エラーの詳細をコンソールに表示
      alert("決済に失敗しました。もう一度お試しください。");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("決済成功:", paymentIntent);
      alert("決済が完了しました！");
      setBalance(balance - totalAmount); // 支払い後に所持金額を更新
    } else {
      console.error("決済状態の確認に失敗しました", paymentIntent); // 状態確認エラーの詳細
      alert("決済の状態確認に失敗しました。");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>商品購入ページ</h2>

      {/* 所持金額の表示 */}
      <div className="my-4">
        <h4>所持金額: ¥{balance.toLocaleString()}</h4>
      </div>

      {/* 合計金額の表示 */}
      <div className="order-summary my-4">
        <h4>注文概要</h4>
        <p>小計: ¥{subtotal.toLocaleString()}</p>
        <p>消費税: ¥{taxAmount.toLocaleString()}</p>
        <p>送料: ¥{shippingFee.toLocaleString()}</p>
        <h3>合計: ¥{totalAmount.toLocaleString()}</h3>
      </div>

      {/* 支払いフォーム */}
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
          disabled={loading || !stripe || balance < totalAmount} // 所持金額が足りない場合はボタンを無効化
        >
          {loading ? "処理中..." : "支払いを完了する"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
