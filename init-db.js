const pool = require('./db');

async function initDatabase() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create menu_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(5,2) NOT NULL,
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        items JSONB NOT NULL,
        total DECIMAL(8,2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables created successfully');
    
    // Seed initial data
    await seedDatabase();
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

async function seedDatabase() {
  try {
    // Seed menu items
    const menuItems = [
      { name: 'Espresso', price: 2.50, category: 'coffee' },
      { name: 'Americano', price: 3.00, category: 'coffee' },
      { name: 'Latte', price: 4.00, category: 'coffee' },
      { name: 'Cappuccino', price: 4.50, category: 'coffee' },
      { name: 'Mocha', price: 4.75, category: 'coffee' },
      { name: 'Croissant', price: 3.25, category: 'pastry' },
      { name: 'Muffin', price: 2.75, category: 'pastry' },
      { name: 'Bagel', price: 2.50, category: 'pastry' }
    ];

    for (const item of menuItems) {
      await pool.query(
        'INSERT INTO menu_items (name, price, category) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [item.name, item.price, item.category]
      );
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = initDatabase;