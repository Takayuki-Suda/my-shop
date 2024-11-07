// src/app/products/page.tsx
"use client";

import { useCart } from "../../context/CartContext"; // useCart をインポート
import { Product } from "../../types"; // Product型のインポート
import { toast } from "react-toastify"; // トースト通知のためのインポート
import ProductItem from "../../components/ProductItem"; // 商品アイテムコンポーネントのインポート

const ProductPage = () => {
  const { addItem } = useCart(); // カートに商品を追加する関数を取得

  // 商品をカートに追加する関数
  const handleAddToCart = (product: Product) => {
    addItem(product); // 商品をカートに追加
    toast.success(`${product.name}がカートに入りました！`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const product1: Product = {
    id: 1,
    name: "商品A",
    price: 1000,
    quantity: 1,
    imageUrl: "/images/product1.jpg", // 商品Aの画像 URL
  };

  const product2: Product = {
    id: 2,
    name: "商品B",
    price: 2000,
    quantity: 1,
    imageUrl: "/images/product2.jpg", // 商品Bの画像 URL
  };

  const product3: Product = {
    id: 3,
    name: "商品C",
    price: 3000,
    quantity: 1,
    imageUrl: "/images/product3.jpg", // 商品Cの画像 URL
  };

  return (
    <div>
      <h1>商品ページ</h1>
      <div className="row">
        <div className="col-4">
          <ProductItem product={product1} onAddToCart={handleAddToCart} />
        </div>
        <div className="col-4">
          <ProductItem product={product2} onAddToCart={handleAddToCart} />
        </div>
        <div className="col-4">
          <ProductItem product={product3} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
