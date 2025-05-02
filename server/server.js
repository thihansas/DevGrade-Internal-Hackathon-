// Simple express server for the e-commerce challenge
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

// Product data (normally this would come from a database)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        stock: 15
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 149.99,
        image: "https://via.placeholder.com/300x200?text=Smart+Watch",
        description: "Track your fitness and stay connected with this stylish smart watch.",
        stock: 8
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 59.99,
        image: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
        description: "Portable speaker with amazing sound quality.",
        stock: 20
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=Laptop+Backpack",
        description: "Water-resistant backpack with laptop compartment.",
        stock: 12
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 24.99,
        image: "https://via.placeholder.com/300x200?text=Wireless+Mouse",
        description: "Ergonomic wireless mouse for comfortable use.",
        stock: 25
    },
    {
        id: 6,
        name: "USB-C Hub",
        price: 34.99,
        image: "https://via.placeholder.com/300x200?text=USB-C+Hub",
        description: "Expand your connectivity with multiple ports.",
        stock: 18
    }
];

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Process checkout
app.post('/api/checkout', (req, res) => {
    const { items, customerInfo } = req.body;
    
    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'No items in cart' });
    }
    
    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
        return res.status(400).json({ message: 'Missing customer information' });
    }
    
    // In a real application, we would:
    // 1. Verify product availability
    // 2. Process payment
    // 3. Update inventory
    // 4. Create order in database
    
    // For this challenge, we'll just simulate a successful checkout
    const orderNumber = Math.floor(Math.random() * 1000000);
    
    res.json({
        success: true,
        orderNumber,
        message: `Order #${orderNumber} placed successfully!`
    });
});

// Apply discount code
app.post('/api/discount', (req, res) => {
    const { code } = req.body;
    
    // Sample discount codes
    const discountCodes = {
        'WELCOME10': { percentage: 10, message: '10% discount applied!' },
        'SPRING25': { percentage: 25, message: '25% discount applied!' },
        'FREESHIP': { percentage: 5, message: 'Free shipping (5% discount) applied!' }
    };
    
    const discount = discountCodes[code];
    
    if (discount) {
        res.json({ success: true, ...discount });
    } else {
        res.status(400).json({ success: false, message: 'Invalid discount code' });
    }
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Handle 404s
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});