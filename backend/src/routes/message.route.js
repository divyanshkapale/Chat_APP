import express from "express"

const router = express.Router()

router.get("/send",(req,res)=>{
    res.send("message Sent")
})
export default router