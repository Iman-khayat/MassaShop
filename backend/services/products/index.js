const express = require('express');
const router = express.Router();
const sql = require('mssql');

// إعداد اتصال قاعدة البيانات
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// جلب جميع المنتجات
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Products');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// إضافة منتج جديد
router.post('/add', async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .query(
        `INSERT INTO Products (Name, Description, Price, Stock, Category)
         VALUES ('${name}', '${description}', ${price}, ${stock}, '${category}')`
      );
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
