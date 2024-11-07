// src/app/cart/page.tsx
"use client";

import { useCart } from "../../context/CartContext"; // useCart をインポート
import { toast } from "react-toastify"; // トースト通知のためのインポート
import CartItem from "../../components/CartItem"; // カートアイテムコンポーネントのインポート

const CartPage = () => {
  const { cart, removeItem } = useCart(); // カートの状態と削除機能を取得

  const handleRemoveFromCart = (productId: number) => {
    removeItem(productId);
    toast.info("商品がカートから削除されました");
  };

  return (
    <div>
      <h1>カートページ</h1>
      {cart.length === 0 ? (
        <p>カートにはアイテムがありません。</p>
      ) : (
        cart.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            onRemove={handleRemoveFromCart}
          />
        ))
      )}
    </div>
  );
};

export default CartPage;
