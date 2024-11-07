"use client";

import { useCart } from "../../context/CartContext"; // useCart をインポート
import { toast } from "react-toastify"; // トースト通知のためのインポート
import CartItem from "../../components/CartItem"; // カートアイテムコンポーネントのインポート

const CartPage = () => {
  const { cart, removeItem, updateQuantity } = useCart(); // カートの状態、削除、数量変更機能を取得

  const handleIncreaseQuantity = (
    productId: number,
    currentQuantity: number
  ) => {
    updateQuantity(productId, currentQuantity + 1);
    toast.success("数量が増えました");
  };

  const handleDecreaseQuantity = (
    productId: number,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
      toast.success("数量が減りました");
    } else {
      toast.warning("数量は1個未満にはできません");
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeItem(productId); // 商品を削除
    toast.info("商品がカートから削除されました"); // 削除後にトースト通知を表示
  };

  return (
    <div>
      <h1>カートページ</h1>
      {cart.length === 0 ? (
        <p>カートにはアイテムがありません。</p>
      ) : (
        <div className="d-flex flex-wrap">
          {cart.map((product) => (
            <div className="col-12 col-md-4 mb-4" key={product.id}>
              <CartItem
                product={product}
                onRemove={handleRemoveFromCart} // 削除ボタンにトースト通知を関連付け
                onIncrease={() =>
                  handleIncreaseQuantity(product.id, product.quantity)
                }
                onDecrease={() =>
                  handleDecreaseQuantity(product.id, product.quantity)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
