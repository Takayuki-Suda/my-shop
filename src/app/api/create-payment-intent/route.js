// ESモジュール形式でインポート
import Stripe from "stripe";

// Stripeインスタンスを作成
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01", // APIのバージョンを指定
});

export async function POST(request) {
  const { amount } = await request.json();

  try {
    // PaymentIntentを作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // 金額（単位は最小通貨単位、例えば日本円なら「銭」）
      currency: "jpy", // 日本円で支払い
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret })
    );
  } catch (error) {
    console.error("PaymentIntent作成エラー:", error);
    return new Response("エラーが発生しました", { status: 500 });
  }
}
