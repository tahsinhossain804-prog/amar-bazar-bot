const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ফ্রন্টএন্ড থেকে কল করার জন্য জরুরি
const app = express();

app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8643806603:AAHsb0tIJEw1m6BI2o8HAAv2MO6R0Ai1Lz8";
const CHAT_ID = "7000704615"; // userinfobot থেকে পাওয়া আইডি এখানে দিন

app.post('/notify', async (req, res) => {
    const { orderId, customerName, totalAmount, trxId } = req.body;
    
    const message = `
🛍️ *New Order Alert!*
--------------------------
*Order ID:* ${orderId}
*Customer:* ${customerName}
*Amount:* ৳${totalAmount}
*TrxID:* ${trxId || "N/A"}
--------------------------
Check Admin Panel for details.
    `;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot server is running on port ${PORT}`));
