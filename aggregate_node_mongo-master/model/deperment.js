const mongoose=require('mongoose')
const Schema=mongoose.Schema

const depermentSchema= new Schema({
    name:{
        type:String,
        required:true,
    }
});


const depermentModel= new mongoose.model('deperment',depermentSchema)
 module.exports = depermentModel