const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/testRoutes');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use('/api/test', testRoutes);

module.exports = app;
