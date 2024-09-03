const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer'); // For handling file uploads
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust if your frontend runs on a different port
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename collisions
  }
});
const upload = multer({ storage: storage });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for products
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prod_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Optional field for image URL
  },
  images: [String], // Array of image URLs
});

const Product = mongoose.model('Product', ProductSchema);

// GET Route to fetch data from MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.json(products); // Send data as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST Route to upload data to MongoDB
app.post('/api/products', upload.single('image'), async (req, res) => {
  const { name, prod_id, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Handle image path

  try {
    const newProduct = new Product({ name, prod_id, price, description, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ message: 'Error uploading data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
