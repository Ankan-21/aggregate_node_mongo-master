const mongoose=require('mongoose')
const Schema=mongoose.Schema

const orderSchema= new Schema({
    item:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    
});

const orderModel= new mongoose.model('orders',orderSchema)
 module.exports = orderModel