const express=require('express')
const route=express.Router()
const groupController=require('../controller/GroupByController')
const body_parser = require('body-parser')
route.use(body_parser.json());
route.use(body_parser.urlencoded({ extended: true }));



route.post('/addemployee',groupController.addemp);
route.get('/alldata',groupController.all);
//match
route.get('/match',groupController.metchdata);

//group 
route.get('/group',groupController.gruopdata);

//sort
route.get('/sort',groupController.sortdata);

module.exports=route