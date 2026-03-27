const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// anti double message
const processedMessages = new Set();

// init client (fix untuk Railway)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// QR
client.on('qr', qr => {
    console.log('QR RECEIVED, scan ya 👇');
    qrcode.generate(qr, { small: true });
});

// ready
client.on('ready', () => {
    console.log('Bot siap 🚀');
});

// message handler
client.on('message', async msg => {

    // hindari double reply
    if (processedMessages.has(msg.id.id)) return;
    processedMessages.add(msg.id.id);

    const text = msg.body.toLowerCase();

    // efek typing biar natural 😏
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    const contains = (keywords) => {
        return keywords.some(word => text.includes(word));
    };

    // ========================
    // MENU AWAL
    // ========================
    if (contains(['halo', 'hai', 'hello', 'pagi', 'siang', 'malam'])) {
        msg.reply(`Halo kak 👋
Selamat datang di PT Aditya Sejahtera Graha

Kami melayani:
1. End User (Pembelian)
2. Wholesale / Reseller
3. Service & Garansi

Silakan ketik kebutuhan kakak ya 😊`);
    }

    // ========================
    // SERVICE
    // ========================
    else if (contains([
        'service',
        'servis',
        'perbaikan',
        'benerin',
        'rusak',
        'garansi',
        'klaim'
    ])) {
        msg.reply(`Siap kak 🙏

Untuk service center Surabaya:

📍 Jl. Kedung Doro No.275, Wonorejo, Tegalsari

Link maps:
https://maps.google.com/?q=Jl+Kedung+Doro+No+275+Surabaya`);
    }

    // ========================
    // PEMBELIAN
    // ========================
    else if (contains([
        'beli',
        'produk',
        'harga',
        'order',
        'pesan'
    ])) {
        msg.reply(`Siap kak 👍

Kakak mau cari produk brand apa?

1. KIRIN
2. WASSER
3. ROCA

Tinggal ketik nama brand ya 😊`);
    }

    // ========================
    // WHOLESALE
    // ========================
    else if (contains([
        'reseller',
        'grosir',
        'wholesale',
        'partai'
    ])) {
        msg.reply(`Untuk wholesale ya kak 🙌

Silakan kirim data berikut:
Nama Toko:
Kota:
Produk yang diminati:`);
    }

    // ========================
    // BRAND
    // ========================
    else if (text.includes('kirin')) {
        msg.reply(`Produk KIRIN tersedia kak 👍

Silakan kirim tipe produk yang dicari ya 😊`);
    }

    else if (text.includes('wasser')) {
        msg.reply(`Produk WASSER tersedia kak 👍

Silakan kirim tipe atau kebutuhan kakak ya 😊`);
    }

    else if (text.includes('roca')) {
        msg.reply(`Produk ROCA tersedia kak 👍

Silakan kirim kebutuhan kakak ya 😊`);
    }

    // ========================
    // FALLBACK
    // ========================
    else {
        msg.reply(`Mohon maaf kak 🙏

Pesan belum bisa kami pahami.

Silakan ketik:
- "halo" untuk menu
- atau jelaskan kebutuhan kakak ya 😊`);
    }

});

// start
client.initialize();