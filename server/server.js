const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());


app.use('/users', userRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/auth', authRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
