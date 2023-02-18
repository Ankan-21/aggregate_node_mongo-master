
const express= require('express')
const flash= require('connect-flash')
const productModel = require('../model/ProductModel')

exports.productview=(req,res,next)=>{

    productModel.find(function(err,data){
        if(!err){

            res.render('product_view',{

                title:"home page",
                message:req.flash('message')
                
            })
        }
    })

}  

productModel.find({price:{$gte:455,$lte:788}}).limit(5).sort({price:-1}).exec(function(err,data){

    if(!err){
        res.render('product_view',{
            title:"home",
            message:req.flash('message'),
            displaydata:data
        })
    }
})

productModel.aggreate([{$limit:4},{$sort:{price:7}}]) 

exports.productview=(req,res,next)=>{

    productModel.aggreate([

        {

            $group:{

              
                $id:"$name",
                price:{$avg:"$price"},
                productname:{$firstname:"$productname"},
                size:{$max:"$size"}
                
            }

        }
    ]) .exec(function(err,data){

        if(!err){
            res.render('product_view',{

                title:"home",
                message:req.flash('message'),
                displaydata:data
            })
        }
    })
}

exports.productview=(req,res,next)=>{

    productModel.aggreate([{$limit:5},{$sort:{price:2}}]).exec(function(err,data){

        res.render('product_view',{

            title:"home",
            message:req.flash('message'),
            displaydata:data
        })
    })
}


exports.productview=(req,res,next)=>{

    productModel.find({price:{$gte:65,$lte:45}}).limit(7).sort({price:1}).exec(function(err,data){

        res.render('product_view',{

            title:"home",
            message:req.flash('message'),
            displaydata:data
        })
    })
}

