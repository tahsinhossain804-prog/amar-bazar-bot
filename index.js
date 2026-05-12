const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// আপনার নতুন টোকেন এবং আইডি এখানে আপডেট করা হলো
const TELEGRAM_TOKEN = '8643806603:AAHsb0tIJEw1m6BI2o8HAAv2M06R0Ai1Lz8'; 
const CHAT_ID = '7000704615'; 

app.get('/', (req, res) => {
    res.send('Amar Bazar Bot (TahsinwayBot) is Running Live!');
});

app.post('/notify', async (req, res) => {
    const { orderId, customerName, totalAmount, trxId } = req.body;

    const message = `
🔔 **নতুন অর্ডার এসেছে!**
━━━━━━━━━━━━━━━━
📦 **অর্ডার আইডি:** ${orderId || 'N/A'}
👤 **কাস্টমার:** ${customerName || 'Guest'}
💰 **মোট টাকা:** ${totalAmount || '0'} TK
💳 **TrxID:** ${trxId || 'N/A'}
━━━━━━━━━━━━━━━━
অ্যাডমিন প্যানেল চেক করুন।
    `;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Telegram Error:', error.response ? error.response.data : error.message);
        res.status(500).send({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
