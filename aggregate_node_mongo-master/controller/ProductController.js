const express=require('express')
const path=require('path')
const flash=require('connect-flash')
const productModle=require('../model/ProductModel')

exports.Productview=(req,res,next)=>{
    productModle.find(function(err,data) {
        if(!err){
            res.render('product_view',{
                title:"homepage",
                message:req.flash('message'),
               displaydata:data
            })     
       } 
     });
        
    }

//fetch selected data without aggregate mathod
// exports.Productview=(req,res,next)=>{
//     productModle.find({},{image:0,price:0},function(err,data) {
//         if(!err){
//             res.render('product_view',{
//                 title:"homepage",
//                 message:req.flash('message'),
//                displaydata:data
//             })     
//        } 
//      });
        
//     }

//show product data
//we use agerite function sort asec ans desc and also use limit.
//if you want to not use this simple remove

//  exports.Productview=(req,res,next)=>{
// productModle.find({price: {$gte: 500, $lte: 1000}}).limit(5).sort({price: -1}).exec(function(err,data) {
//     if(!err){
//         res.render('product_view',{
//             title:"homepage",
//             message:req.flash('message'),
//            displaydata:data
//         })     
//    } 
//  });  
// }


//aggrigrate limit and sort
// exports.Productview=(req,res,next)=>{
// productModle.aggregate([{$limit:5},{$sort:{price:1}}]).exec(function(err,data) {
//     if(!err){
//         res.render('product_view',{
//             title:"homepage",
//             message:req.flash('message'),
//            displaydata:data
//         })     
//    } 
//  });
//  }
//$group aggrigrate method
// exports.Productview=(req,res,next)=>{
//     productModle.aggregate([
//         {
//             $group:{
//                 _id: "$size",
//             price: { $avg: "$price" },
//             product_name: { $first: "$product_name" },
//             image: { $first: "$image" },
//             size:{$max:"$size"}
           
//             }
//         }
//     ]).exec(function(err,data) {
//         console.log(data);
//         if(!err){
//             res.render('product_view',{
//                 title:"homepage",
//                 message:req.flash('message'),
//                displaydata:data
//             })     
//        } 
//      });     
//     }

//view add product page
exports.AddProduct=(req,res,next)=>{ 
    res.render('add_product',{
        title:"add-page" ,
        error:req.flash('error'),
    })
}
// add database form product data
exports.AddPostProduct=(req,res,next)=>{
    const image= req.file
    //console.log(image)
    const Product= new productModle({
        product_name: req.body.pname,
        price: req.body.price,
        size: req.body.size,
        details:req.body.details,
        gender:req.body.gender,
        image: image.path
    })
    Product.save().then((result)=>{
        
         console.log(result,"Product save successfully")
         req.flash('message','Added Product Successfully')
        res.redirect('/')
    }).catch((err)=>{
        console.log(err,"product not saved")
        req.flash('error','you can not sent blank data')
        res.redirect('/add-product')
    })
}

//show edit page
exports.EditProduct=(req,res,next)=>{  
    const pid=req.params.p_id
    productModle.findById(pid).then(product=>{
        console.log(product)
        res.render('edit_product',{
            title:"edit-product",
            singledata:product
        })
    }).catch(err=>{
        console.log(err)
    })
}
//update product
exports.UpdateProduct=(req,res,next)=>{
    const image= req.file
    //console.log(image);
    const product_id=req.body.p_id
    const product_name=req.body.pname
    const price=req.body.price
    const size=req.body.size
    const details=req.body.details
    const gender=req.body.gender
    //console.log(product_id,product_name,price,size,details,image)
    productModle.findById(product_id).then((result)=>{
        result.product_name=product_name
        result.price=price
        result.size=size
        result.details=details
        result.gender=gender
        result.image=image.path
        return result.save().then(results=>{    
            res.redirect('/')
            console.log(result,"update successfully")
        })
    }).catch(err=>{
        console.log(err,"update product failed-")
    })
}
//delete product
exports.DeleteProduct=(req,res,next)=>{
    const pid=req.params.p_id
    productModle.deleteOne({_id:pid}).then(deleteproduct=>{
        console.log(deleteproduct,"delete product")
        res.redirect('/')
    }).catch((err)=>{
        console.log(err,"delete failed")
    })
}


