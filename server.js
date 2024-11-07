// server.js (Node.jsのサーバーサイドコード)
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe("your-secret-key-here");

const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // 金額は最小単位（例えば円なら「¥」でなく「1000」）
      currency: "jpy",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
