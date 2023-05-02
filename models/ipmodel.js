const mongoose=require('mongoose')

const userIP=mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:'user',required: true},
    preSearches:[{type:String,required:true}]
})

const userIPList= mongoose.model('ip',userIP)

module.exports=userIPList