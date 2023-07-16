import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import dotenv from "dotenv"
import connectToDB from "./models/DB_connection.js";

dotenv.config();

const app = express();


// Налаштування CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

// Підключення роутера
app.use(router);

const startServer = async () => {
    try {
        await connectToDB();
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Express server startup error:', error);
    }
}

startServer();