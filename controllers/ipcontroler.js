const {redisClinent}=require('../helpers/redis')
const axios=require('axios')
const userIPList=require('../models/ipmodel')
const UserModel=require('../models/userModel')
const API_KEY = process.env.OW_API_KEY

const getIPdata= async(req,res)=>{
    try{
        const ip = req.params.ip || req.body.preferred_IP;

        const iscityInCache=await redisClinent.get(`${ip}`)

        console.log(iscityInCache)

        if(iscityInCache) return res.status(200).send({data: iscityInCache})

        const response = await axios.get(`https://ipapi.co/v1/current.json?key=${API_KEY}&q${city}`)

        const ipdat = response.data

        console.log(ipdat)

        redisClinent.set(ip,JSON.stringify(ipdat),{EX: 360*60})

        await userIPList.findOneAndUpdate({userId: req.body.userId},{
            userId: req.body.userId, $push: {preSearches:city}
        },{new:true, upsert:true, setDefaultsOnInsert:true})

        return res.send({data: ipdat})

    }catch(err){
        return res.status(500).send(err.message)
    }
}

module.exports=getIPdata