import express from "express";

import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/post",  postRoute);


const listenPort = () => {
    app.listen(8000, () => {
        console.log("Server is listening on port 8000")
    })
}

listenPort();