const mongoose=require('mongoose')
const Schema=mongoose.Schema

const ProductSchema= new Schema({
    product_name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    size:{
        type:String,
        required:true,
    },
    details:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
    }
});

//module.exports=mongoose.model('product',ProductSchema)
const productModel= new mongoose.model('product',ProductSchema)
 module.exports = productModel