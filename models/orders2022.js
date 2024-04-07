const mongoose=require ("mongoose");

const ordersSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },myid:{
        type:String,
        required:true
    },
    placedlist:{
        type:Array,
        required:true
    },
    book:{
        type:Number
    },payments:{
        type:Number
    },
    delivery:{
        type:Number
    },status:{
        type:Number 
    },phone:{
        type:String,
        required:true
    },shipping:{
        type:String,
        required:true
    },date:{
        type:String,
        required:true
    },location:{
        type:String,
        required:true
    },delivereddate:{
        type:String,
        required:true
    },comment:{
        type:String
    },sellerdiscount:{
        type:Number
    },deliverycharge:{
        type:Number
    }
});
const orders2022=module.exports=mongoose.model("orderlist2022",ordersSchema);