const mongoose=require ("mongoose");

const sellerSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },details:{
        type:Array,
        required:true
    },pdf:{
        type:String,
        required:true
    },deliverycharge:{
        type:Number,
        required:true
    },minbuyprice:{
        type:Number,
        required:true
    }

});
const sellers=module.exports=mongoose.model("sellerlist",sellerSchema);