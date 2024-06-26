const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    // Tambahkan field lain sesuai kebutuhan
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
