const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// আপনার টোকেন এবং আইডি এখানে বসানো হয়েছে
const TELEGRAM_TOKEN = '7604473723:AAF9y7_9tq8Z7K773-y972q8z7k773'; 
const CHAT_ID = '717305179';

app.get('/', (req, res) => {
    res.send('Amar Bazar Bot is Running Live!');
});

app.post('/notify', async (req, res) => {
    const { orderId, customerName, totalAmount, trxId } = req.body;

    const message = `
🔔 **নতুন অর্ডার এসেছে!**
━━━━━━━━━━━━━━━━
📦 **অর্ডার আইডি:** ${orderId}
👤 **কাস্টমার:** ${customerName}
💰 **মোট টাকা:** ${totalAmount} TK
💳 **TrxID:** ${trxId}
━━━━━━━━━━━━━━━━
অ্যাডমিন প্যানেল চেক করুন।
    `;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        res.status(200).send({ success: true, message: 'Notification sent!' });
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        res.status(500).send({ success: false, error: 'Failed to send message' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
