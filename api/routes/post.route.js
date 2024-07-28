import express from "express";

const router = express.Router();


router.get("/test", (req, res) => {
    res.send("Post a Post for someone to read");
})


export default router;