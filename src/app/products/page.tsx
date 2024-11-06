"use client";

import { useCart } from "../../context/CartContext";
import { Product } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "商品1",
    price: 1000,
    image: "/images/product1.jpg",
    description: "商品の説明1",
  },
  {
    id: 2,
    name: "商品2",
    price: 2000,
    image: "/images/product2.jpg",
    description: "商品の説明2",
  },
  {
    id: 3,
    name: "商品3",
    price: 3000,
    image: "/images/product3.jpg",
    description: "商品の説明3",
  },
];

export default function ProductsPage() {
  const { addToCart, cart } = useCart(); // カートの状態を取得

  const handleAddToCart = (product: Product) => {
    addToCart(product); // 商品をカートに追加
    console.log("商品がカートに追加されました:", product); // デバッグ用ログ
  };

  useEffect(() => {
    // カートにアイテムが追加されるとトースト通知
    if (cart.length > 0) {
      const lastAddedProduct = cart[cart.length - 1];
      console.log("カートに追加された商品:", lastAddedProduct); // デバッグ用ログ

      // トースト通知を表示（カートが更新されたとき）
      toast.success(`${lastAddedProduct.name}がカートに入りました！`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [cart]); // cartの変更に依存して実行

  return (
    <div className="container">
      <h1>商品一覧</h1>
      <div className="row">
        {sampleProducts.map((product) => (
          <div className="col-12 col-md-4" key={product.id}>
            <div className="card">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">¥{product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)} // ボタンがクリックされたらカートに追加
                >
                  カートに入れる
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
