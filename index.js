const express=require('express')
const {connection}=require('./config/db')
const {userRouter}=require('./routes/userrout')
const cityRouter=require('./routes/iproutes')
const {redisClient} = require("./helpers/redis");

const logger = require("./middlewares/logger")

require("dotenv").config()
const port = process.env.port || 8080
const app=express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Home')
})


app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})

app.use("/ip/user",userRouter)

app.use("/ip/city",cityRouter);



app.listen(port, async()=>{
    try{
        await connection()
        console.log('connected to DB')
    }catch(err){
        console.log(err)
    }
    console.log('server running on port',port)
})
