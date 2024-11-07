// src/components/CartItem.tsx
import { Product } from "../types";

type CartItemProps = {
  product: Product;
  onRemove: (productId: number) => void;
};

const CartItem = ({ product, onRemove }: CartItemProps) => {
  return (
    <div className="cart-item">
      <h4>{product.name}</h4>
      <p>価格: ¥{product.price}</p>
      <p>数量: {product.quantity}</p>
      <button onClick={() => onRemove(product.id)}>削除</button>
    </div>
  );
};

export default CartItem;
