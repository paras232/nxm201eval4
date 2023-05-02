const redis = require('redis')
const ioredis=require('ioredis')

const redisClinent=redis.createClient();

redisClinent.on('connect', async()=>{
    console.log("Connected to redis");
})

redisClinent.on("error",(err)=>{
    console.log(err.message)
})

redisClinent.connect();

module.exports={redisClinent}