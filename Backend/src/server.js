import express from 'express';
import dotenv from 'dotenv';
dotenv.config( {path: './src/.env'});
import cors from 'cors'; 
import dns from 'dns';
import path from "path";

import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';    

import rateLimiter from './middleware/rateLimiter.js';

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


//middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: 'http://localhost:5173',
    }));    
}
app.use(express.json());//access the json data from the request body
app.use(rateLimiter); 


// app.use((req,res,next) => {
//     console.log(`Req method: ${req.method} URL: ${req.url}`);
//     next();
// })
// console.log(process.env.UPSTASH_REDIS_REST_URL);
// console.log("TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN);  

app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}

// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/payments", paymentRoutes);
connectDB().then(() => { 
app.listen(5001, () => {
    console.log('Server is running on port 5001'); 
})  
})