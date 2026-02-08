const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const dotenv = require('dotenv');
const errorHandler = require('./Middlewares/errorHandler');
dotenv.config();
const port = process.env.PORT 


app.use(express.json());
app.use(
  cors({
    origin: "*", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
}); 

const authRoutes = require('./Routes/AuthRoutes')
const postRoutes = require('./Routes/PostRoutes')



app.use('/api/v2/auth', authRoutes )
app.use('/api/v2/posts', postRoutes)



app.use(errorHandler)
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
