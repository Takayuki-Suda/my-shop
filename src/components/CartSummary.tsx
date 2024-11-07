// src/components/CartSummary.tsx
import { FC } from "react";

interface CartSummaryProps {
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
}

const CartSummary: FC<CartSummaryProps> = ({
  subtotal,
  taxAmount,
  shippingFee,
  totalAmount,
}) => {
  return (
    <>
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
  );
};

export default CartSummary;
