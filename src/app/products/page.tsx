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

  const someProduct: Product = {
    id: 1,
    name: "商品A",
    price: 1000,
    quantity: 1,
  };

  return (
    <div>
      <h1>商品ページ</h1>
      <ProductItem product={someProduct} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;
