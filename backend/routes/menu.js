const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');  // Mengimpor model Menu dengan jalur relatif yang benar

// Rute untuk menambah item menu baru
router.post('/', async (req, res) => {
    const { name, image, price } = req.body;

    if (!name || !image || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newItem = new Menu({ name, image, price });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error saving item', error });
    }
});

// Rute untuk mendapatkan semua item menu
router.get('/', async (req, res) => {
    try {
        const items = await Menu.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

module.exports = router;
