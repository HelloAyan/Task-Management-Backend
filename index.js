import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './route/userRoute.js'


dotenv.config()
const app = express()

// Middleware
// app.use(cors())
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL

// Connect to MongoDB
mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
})


// Routes
app.use('/api/v1/', userRoute);

app.get('/', (req, res) => {
    res.send('Task Management API is running...');
})