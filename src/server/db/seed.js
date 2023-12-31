const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
    isAdmin: false,
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
    isAdmin: false,
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
    isAdmin: false,
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    isAdmin: false,
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Jamie Chuang',
    email: 'MxJChuang@money.com',
    password: 'morbidcuriosity',
    isAdmin: true,
  },
];

const products = [
  {
    name: 'Ghost Cat Keychain',
    price: 19.99,
    description: 'Description for Product 1',
    category: 'Keychain',
    onSale: false,
    image: 'https://i.imgur.com/FHfjUae.png',
  },
  {
    name: 'Paw Keychain',
    price: 29.99,
    description: 'Description for Product 2',
    category: 'Keychain',
    onSale: false,
    image: 'https://imgur.com/yfyHK0r.png',
  },
  {
    name: 'Kitty Keychain',
    price: 9.99,
    description: 'Description for Product 3',
    category: 'Keychain',
    onSale: true,
    image: 'https://imgur.com/yfyHK0r.png',
  },
  {
    name: 'Miffy Patch',
    price: 39.99,
    description: 'Description for Product 4',
    category: 'Plushy',
    onSale: false,
    image: 'https://imgur.com/kwIAy5y.png',
  },
  {
    name: 'Bob Patch',
    price: 49.99,
    description: 'Description for Product 5',
    category: 'Plushy',
    onSale: true,
    image: 'https://imgur.com/b5go1jN.png',
  },
];

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS cart_items CASCADE; -- Add this line to drop the cart_items table
    `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin boolean DEFAULT false
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT,
        category TEXT,
        onSale VARCHAR(255) NOT NULL,
        image TEXT
      );

      CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL
      );
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
    }
    console.log('User seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting user seed data:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        onSale: product.onSale,
        image: product.image,
      });
    }
    console.log('Product seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting product seed data:', error);
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertProducts();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
