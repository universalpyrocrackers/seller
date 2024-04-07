const mongoose=require ("mongoose");

const productSchema=mongoose.Schema({
   name:{
        type:String,
        required:true
    },category:{
        type:String,
        required:true
       },brand:{
        type:String,
        required:true
       },description:{
        type:String
       },price:{
        type:Number,
        required:true
    },
    discountpercent:{
        type:Number,
        required:true
    },disprice:{
        type:Number,
        required:true
    },
    disamount:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },available:{
        type:String,
        required:true
    },video:{
        type:String
        
    },supersalepos:{
        type:Number,
        required:true
    },resellerprice:{
        type:Number
    },shopprice:{
        type:Number
    },position:{
        type:Number,
        required:true
    },sold:{
        type:Number
    },availablestock:{
        type:Number
    }

});
const products=module.exports=mongoose.model("productlist",productSchema);