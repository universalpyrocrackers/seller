const mongoose=require ("mongoose");

const brandSchema=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },position:{
        type:Number,
        required:true
    }
});
const brands=module.exports=mongoose.model("brandlist",brandSchema);