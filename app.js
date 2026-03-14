const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to PerkPoint Coffee Shop!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});