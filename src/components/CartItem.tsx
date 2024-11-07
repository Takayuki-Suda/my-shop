// src/components/CartItem.tsx
import { Product } from "../types";

type CartItemProps = {
  product: Product;
  onRemove: (productId: number) => void;
  onIncrease: () => void; // 数量増加のための関数
  onDecrease: () => void; // 数量減少のための関数
};

const CartItem = ({
  product,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  return (
    <div className="cart-item">
      <h4>{product.name}</h4>
      <p>価格: ¥{product.price}</p>
      <p>数量: {product.quantity}</p>
      <div className="d-flex">
        <button onClick={onDecrease} className="btn btn-secondary me-2">
          -
        </button>
        <button onClick={onIncrease} className="btn btn-secondary me-2">
          +
        </button>
        <button onClick={() => onRemove(product.id)} className="btn btn-danger">
          削除
        </button>
      </div>
    </div>
  );
};

export default CartItem;
