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

// جلب محتويات العربة لمستخدم معين
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(`SELECT * FROM Cart WHERE UserID = ${userId}`);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// إضافة منتج إلى العربة
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .query(
        `INSERT INTO Cart (UserID, ProductID, Quantity) VALUES (${userId}, ${productId}, ${quantity})`
      );
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// حذف منتج من العربة
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .query(
        `DELETE FROM Cart WHERE UserID = ${userId} AND ProductID = ${productId}`
      );
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
