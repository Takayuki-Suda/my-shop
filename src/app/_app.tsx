// src/app/_app.tsx

import { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext"; // CartProvider をインポート

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;
