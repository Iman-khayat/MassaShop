const express = require('express');
const router = express.Router();
const sql = require('mssql');

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

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let pool = await sql.connect(dbConfig);
    await pool
      .request()
      .query(
        `INSERT INTO Users (Name, Email, Password) VALUES ('${name}', '${email}', '${password}')`
      );
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
