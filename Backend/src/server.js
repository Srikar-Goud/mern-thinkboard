import express from 'express';
import dotenv from 'dotenv';
dotenv.config( {path: './src/.env'});
import cors from 'cors'; 
import dns from 'dns';

import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';    

import rateLimiter from './middleware/rateLimiter.js';

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(express.json());//access the json data from the request body
app.use(rateLimiter); 


// app.use((req,res,next) => {
//     console.log(`Req method: ${req.method} URL: ${req.url}`);
//     next();
// })
// console.log(process.env.UPSTASH_REDIS_REST_URL);
// console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN);  

app.use("/api/notes", notesRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/payments", paymentRoutes);
connectDB().then(() => {
app.listen(5001, () => {
    console.log('Server is running on port 5001'); 
})  
})