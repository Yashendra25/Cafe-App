//name ,phone,sum of all rating,total number of ratings

const mongoose = require('mongoose');
const objectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    reviewsum:{
        type:Number,
        required:true
    },
    reviewcount:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('object',objectSchema);