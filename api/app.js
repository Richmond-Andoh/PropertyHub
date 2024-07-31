import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8900

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: process.env.CLIENT_URL, 
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     credentials: true 
    }));

app.use("/api/auth", authRoute);
app.use("/api/post",  postRoute);
app.use("/api/test", testRoute);

const listenPort = () => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}

listenPort();