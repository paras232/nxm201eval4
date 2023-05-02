const UserModel=require('../models/userModel')

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {redisClinent}=require('../helpers/redis')
require('dotenv').config()

const signup = async(req,res)=>{

    try {
        const {name,email,pass,preferred_IP}=req.body

        const isUserPresent=await UserModel.findOne({email})
        if(isUserPresent) return res.send("user already present, login please")

        const hash = await bcrypt.hash(pass,5)

        const newUser = new UserModel({name,email,pass:hash,preferred_IP})
        await newUser.save()

        res.send("Signup successfull")
    } catch (error) {
        res.send(error.message)
    }
    
}

const login = async(req,res)=>{
    try {
        const {email, pass}=req.body
        const isUserPresent=await UserModel.findOne({email})
        if(!isUserPresent) return res.send("User not present, Please Register");

        const ispassCrrt=await bcrypt.compare(pass,isUserPresent.pass);
        if(!ispassCrrt) return res.send("Invalid Credential")

        const token = await jwt.sign({userId:isUserPresent._id,preferred_IP:isUserPresent.preferred_IP},process.env.JWT_sec,{expiresIn:"1hrs"})

        res.send({message:"login succesfull",token})
    } catch (error) {
        res.send(error.message)
    }
}


const logout = async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1]

        if(!token) return res.status(403)
        await redisClinent.set(token,token)

        res.send("logout successful")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={login,logout,signup}