const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./models/dbConnection.js');

const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500/']
}));
// app.use(express.static('public'));

const productController = require("./controllers/productController.js")
app.use("/product", productController);

const startServer = async () => {
    try {
      await connectToDatabase(); // Підключення до бази даних
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    });
    } catch (error) {
      console.error('Express server startup error:', error);
    }
  };
  
  startServer();
