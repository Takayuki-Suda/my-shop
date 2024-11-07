// src/components/ProductItem.tsx
import { Product } from "../types";

type ProductItemProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductItem = ({ product, onAddToCart }: ProductItemProps) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>価格: ¥{product.price}</p>
      <button onClick={() => onAddToCart(product)}>カートに追加</button>
    </div>
  );
};

export default ProductItem;
