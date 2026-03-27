const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// anti double message
const processedMessages = new Set();

// init client
const client = new Client({
    authStrategy: new LocalAuth()
});

// QR
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// ready
client.on('ready', () => {
    console.log('Bot siap 🚀');
});

// message handler
client.on('message', msg => {

    // hindari double reply
    if (processedMessages.has(msg.id.id)) return;
    processedMessages.add(msg.id.id);

    const text = msg.body.toLowerCase();

    // helper keyword
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

Silakan ketik atau pilih ya kak 😊`);
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

📍 Jl. Kedung Doro No.275, Wonorejo, Kec. Tegalsari, Surabaya

Ini link mapsnya ya:
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
3. ROCA`);
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
    // BRAND (contoh lanjut)
    // ========================
    else if (text.includes('kirin')) {
        msg.reply(`Produk KIRIN tersedia kak 👍

Silakan kirim tipe produk yang dicari ya kak 😊`);
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
    // FALLBACK (kalau tidak ngerti)
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