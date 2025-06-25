const Product = require('../Product');
const express = require('express');
const router = express.Router();
const vlidateproduct = require('../Middleware/validateProduct');

// Post Create a product
router.post('/', vlidateproduct, async (req, res) => {   
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send( error.message);
    }
    })

// Create a route to get all products
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch products' });
    }
});

// Read a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch product' });
    }
});

// Search products by name
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.name;
    if (!searchTerm) return res.status(400).json({ error: 'Missing search query' });

    const products = await Product.find({
      name: { $regex: searchTerm, $options: 'i' }
    });

    res.send(products);
  } catch (error) {
    res.status(500).json({ error: 'Error searching products' });
  }
});

// Update a product by ID
router.put('/:id', vlidateproduct, async (req, res) =>
{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }   
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({ error: 'Failed to update product' });
    }
});
// Delete a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete product' });
    }
});

//Stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product stats' });
  }
});


module.exports = router;
