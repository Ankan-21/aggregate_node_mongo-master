const express=require('express')
const route=express.Router()
const LookupController=require('../controller/lookupController')
const body_parser = require('body-parser')
route.use(body_parser.json());
route.use(body_parser.urlencoded({ extended: true }));



route.post('/addinventoy',LookupController.Addinventory)
route.post('/addorder',LookupController.addorder)
route.get('/getinv',LookupController.getinv)
route.get('/lookupinv',LookupController.lookupinv)


module.exports=route