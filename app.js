const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 3000;

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to PerkPoint Coffee Shop!');
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role = 'customer' } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // TODO: Save to database
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: Fetch user from database
    const user = { id: 1, email, role: 'customer' }; // Mock user
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get menu items
app.get('/api/menu', (req, res) => {
  // TODO: Fetch from database
  const menu = [
    { id: 1, name: 'Espresso', price: 2.50, category: 'coffee' },
    { id: 2, name: 'Latte', price: 4.00, category: 'coffee' }
  ];
  res.json(menu);
});

// Place order
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items } = req.body;
    // TODO: Save to database
    const order = { id: Date.now(), userId: req.user.id, items, status: 'pending' };
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Order failed' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
  // TODO: Fetch from database
  const orders = [{ id: 1, items: [], status: 'completed' }];
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});