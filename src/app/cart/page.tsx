"use client";

import { useCart } from "../../context/CartContext"; // useCartをインポート
import { useMemo, useEffect, useState } from "react"; // useEffectとuseStateを追加
import { ToastContainer, toast } from "react-toastify"; // トースト用

export default function CartPage() {
  const { cart, removeItem } = useCart(); // カートの状態と削除機能を取得

  // 同じ商品をグループ化し、数量をカウント
  const cartItems = useMemo(() => {
    const itemsMap = new Map();
    cart.forEach((item) => {
      if (itemsMap.has(item.id)) {
        itemsMap.get(item.id).quantity += 1;
      } else {
        itemsMap.set(item.id, { ...item, quantity: 1 });
      }
    });
    return Array.from(itemsMap.values());
  }, [cart]);

  // 合計金額の計算
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const taxRate = 0.1; // 消費税率10%
  const taxAmount = subtotal * taxRate;
  const shippingFee = 500; // 送料を一律500円とする

  // 最終合計金額
  const totalAmount = subtotal + taxAmount + shippingFee;

  // トーストの表示状態を管理
  const [hasShownToast, setHasShownToast] = useState(false);

  const handleRemove = (productId: number) => {
    removeItem(productId);
    toast.info("商品がカートから削除されました");
  };

  // 商品がカートに追加されたかを追跡
  useEffect(() => {
    if (cart.length > 0 && !hasShownToast) {
      toast.success("カートに商品が追加されました", {
        position: "top-right",
        autoClose: 3000,
      });
      setHasShownToast(true);
    }
  }, [cart.length, hasShownToast]); // cart.length に依存

  // ページ遷移後に状態をリセット
  useEffect(() => {
    return () => {
      setHasShownToast(false); // 状態をリセットして次回のトーストを表示
    };
  }, []);

  return (
    <div className="container">
      <h1>カート</h1>
      <ToastContainer position="top-right" autoClose={3000} />

      {cartItems.length === 0 ? (
        <p>カートにはアイテムがありません。</p>
      ) : (
        <>
          <ul>
            {cartItems.map((product) => (
              <li
                key={product.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <p>{product.name}</p>
                  <p>価格: ¥{product.price}</p>
                  <p>数量: {product.quantity}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(product.id)}
                >
                  × 削除
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="d-flex justify-content-between">
            <p>小計:</p>
            <p>¥{subtotal.toLocaleString()}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>消費税 (10%):</p>
            <p>¥{taxAmount.toLocaleString()}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>送料:</p>
            <p>¥{shippingFee.toLocaleString()}</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h4>合計金額:</h4>
            <h4>¥{totalAmount.toLocaleString()}</h4>
          </div>
        </>
      )}
    </div>
  );
}
