const mongoose=require ("mongoose");

const commentsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    msg:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },status:{
        type:Number,
        required:true
    }
});
const comments=module.exports=mongoose.model("commentlist",commentsSchema);

