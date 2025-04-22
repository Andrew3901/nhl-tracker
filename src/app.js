import express, { json, urlencoded } from 'express';
const app = express();
import setRoutes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
setRoutes(app);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});