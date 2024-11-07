// src/app/product/[id].tsx
import { useRouter } from "next/router";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // ここではサンプルデータを使用していますが、実際にはIDに基づいて商品データを取得します
  const product = {
    id: 1,
    name: "商品1",
    price: 1000,
    image: "/images/product1.jpg",
    description: "商品の詳細説明1",
  };

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="img-fluid" />
      <p>{product.description}</p>
      <p>価格: ¥{product.price}</p>
      <button className="btn btn-primary">購入する</button>
    </div>
  );
};

export default ProductDetail;
