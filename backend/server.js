const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const userService = require('./services/users/index');

app.use('/api/users', userService);

const productService = require('./services/products/index');
app.use('/api/products', productService);

const cartService = require('./services/cart/index');
app.use('/api/cart', cartService);

const orderService = require('./services/orders/index');
app.use('/api/orders', orderService);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
