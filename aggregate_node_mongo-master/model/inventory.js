const mongoose=require('mongoose')
const Schema=mongoose.Schema

const inventorySchema= new Schema({
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
    stock:{
        type:String,
        required:true,
    },
});


const inventoryModel= new mongoose.model('inventory',inventorySchema)
 module.exports = inventoryModel