"use client"; // クライアントサイドコンポーネントにする

import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useCart } from "../../context/CartContext"; // カートコンテキストをインポート

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null); // 初期状態ではnullにして、サーバーから取得
  const stripe = useStripe();
  const elements = useElements();
  const { subtotal, taxAmount, shippingFee, totalAmount } = useCart(); // カートの合計情報を取得

  // ページ読み込み時に最新の所持金額を取得
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/get-balance");
        const data = await response.json();
        if (response.ok) {
          setBalance(data.balance); // 最新の所持金額をセット
        } else {
          console.error("所持金額の取得に失敗しました:", data.message);
        }
      } catch (error) {
        console.error("所持金額の取得中にエラーが発生しました:", error);
      }
    };

    fetchBalance(); // 初回レンダリング時に最新の所持金額を取得
  }, []); // 空の依存配列で、最初のレンダリング時のみ実行

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

      // 所持金額の更新（再取得）
      await handlePaymentSuccess();
    } else {
      console.error("決済状態の確認に失敗しました", paymentIntent); // 状態確認エラーの詳細
      alert("決済の状態確認に失敗しました。");
    }

    setLoading(false);
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await fetch("/api/updateBalance", {
        method: "PATCH", // 所持金額の更新はPATCHリクエスト
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // ユーザーID
          amount: totalAmount, // 支払金額
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("所持金額の更新に失敗しました:", errorMessage); // エラーメッセージをログに出力
        alert("所持金額の更新に失敗しました: " + errorMessage); // ユーザーにエラー通知
        return;
      }

      const updatedUser = await response.json();
      console.log("所持金額が更新されました:", updatedUser);
      setBalance(updatedUser.balance); // 更新された所持金額を反映
      alert("支払いが完了しました！");

      // 支払い成功後に所持金額を再取得
      const fetchBalance = async () => {
        // 再取得関数をここでも定義
        try {
          const response = await fetch("/api/get-balance");
          const data = await response.json();
          if (response.ok) {
            setBalance(data.balance); // 最新の所持金額をセット
          } else {
            console.error("所持金額の取得に失敗しました:", data.message);
          }
        } catch (error) {
          console.error("所持金額の取得中にエラーが発生しました:", error);
        }
      };

      fetchBalance(); // 最新の所持金額を再取得
    } catch (error) {
      console.error("決済後の所持金額更新中にエラーが発生しました:", error);
      alert("決済後にエラーが発生しました。再度お試しください。");
    }
  };

  // balanceがnullの場合、読み込み中を表示
  if (balance === null) {
    return <div>Loading...</div>;
  }

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
          className={`btn btn-primary ${
            loading || !stripe || balance < totalAmount ? "disabled-btn" : ""
          }`} // 無効時にクラスを追加
          disabled={loading || !stripe || balance < totalAmount} // 所持金額が足りない場合はボタンを無効化
        >
          {loading ? "処理中..." : "支払いを完了する"}
        </button>

        <style jsx>{`
          .disabled-btn {
            background-color: #d6d6d6; // ボタンの背景色をグレーに
            border-color: #cccccc; // ボーダーも薄く
            cursor: not-allowed; // カーソルを「無効」に変更
          }
        `}</style>
      </form>
    </div>
  );
};

export default CheckoutPage;
