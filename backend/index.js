const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const midtransClient = require('midtrans-client');

// Mengkonfigurasi dotenv untuk memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// URL MongoDB dari variabel lingkungan
const mongoUrl = process.env.MONGODB_URI;

// Koneksi ke database
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Databases",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define the Order model
const orderSchema = new mongoose.Schema({
  orderId: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: String,
});

const Order = mongoose.model("Order", orderSchema);

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

app.post('/api/checkout', async (req, res) => {
  const { cartItems } = req.body;
  const orderId = `order_${new Date().getTime()}`;

  const order = new Order({
    orderId,
    items: cartItems,
    status: 'pending',
  });

  try {
    await order.save();

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      },
      item_details: cartItems.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token, orderId });
  } catch (e) {
    console.error("Error creating transaction:", e.message);
    if (!res.headersSent) {
      res.status(500).json({ error: e.message });
    }
  }
});

// Rute untuk Menu
const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

// Rute contoh
app.get("/api", (req, res) => {
  res.send("Hello From Express!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mulai server
app.listen(port, () => console.log(`Listening on port ${port}`));
