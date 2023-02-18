//const department = require(__dirname +'/deperment.js').Schema;
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const employeesSchema= new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    //department: [String]
    department: [
        {
          name: {
            type: String,
            required: true,
          }
        },
      ],
});

const employeeModel= new mongoose.model('employee',employeesSchema)
 module.exports = employeeModel