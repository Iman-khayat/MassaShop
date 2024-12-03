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

// إنشاء طلب جديد
router.post('/create', async (req, res) => {
  const { userId, totalPrice, items } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .query(
        `INSERT INTO Orders (UserID, TotalPrice, Status)
         VALUES (${userId}, ${totalPrice}, 'Pending')`
      );

    // احصل على ID الطلب الجديد
    const orderId = result.recordset.insertId;

    // أضف العناصر إلى جدول OrderItems
    for (const item of items) {
      await pool.request().query(
        `INSERT INTO OrderItems (OrderID, ProductID, Quantity)
         VALUES (${orderId}, ${item.productId}, ${item.quantity})`
      );
    }

    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// جلب طلبات المستخدم
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(`SELECT * FROM Orders WHERE UserID = ${userId}`);
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
