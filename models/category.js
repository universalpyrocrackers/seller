const mongoose=require ("mongoose");

const categorySchema=mongoose.Schema({
    catname:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },qty:{
        type:Number,
        required:true

    },position:{
        type:Number,
        required:true
    },active:{
        type:String,
        required:true
    }
});
const categorys=module.exports=mongoose.model("categorylist",categorySchema);