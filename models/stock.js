const mongoose=require ("mongoose");

const stockSchema=mongoose.Schema({
    productcode:{
        type:Array,
        required:true
    },
    productname:{
        type:Array,
        required:true
    },stock:{
        type:Array,
        required:true
    },sold:{
        type:Array,
        required:true
    }

});
const stocks=module.exports=mongoose.model("stocklist",stockSchema);