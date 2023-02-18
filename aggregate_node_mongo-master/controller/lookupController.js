const Inventory=require('../model/inventory')
const Order=require('../model/order')

const Addinventory=async(req,res)=>{
    try {
        const invt = await new Inventory({
            item: req.body.item,
            qty: req.body.qty,
            price: req.body.price,
            stock: req.body.stock,
        })
        const invt_data = await invt.save();
        res.status(200).send({ success: true, msg: "add inventory data", data: invt_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "not save" })
    }
}


const addorder=async(req,res)=>{
    try {
        const order = await new Order({
            item: req.body.item,
            qty: req.body.qty,
            price: req.body.price,
            
        })
        const order_data = await order.save();
        res.status(200).send({ success: true, msg: "add order data", data: order_data })
    } catch (error) {
        res.status(400).send({ success: false, msg: "not save" })
    }
}

//get selected data in inventory model
const getinv=async(req,res)=>{
    try {
        //user aggregate project
        const response = await Inventory.aggregate([{$project:{item:1,qty:1,stock:1}}]);
      //use without aggregate project
      //const response = await Inventory.find({},{item:1});
        res.status(200).send({ success: true, msg: "get category data", data: response })
    } catch (error) {
        res.status(400).send({ success: false, msg: "failed" })
    }
}

//lookup 
const lookupinv=async(req,res)=>{
    try {
        //user aggregate project
        const response = await Inventory.aggregate([
            {
                $match:{
                    "item":"mouse"
                }
            },
           {
            $lookup:{
                from:"orders",
                localField: "item",
                foreignField: "item",
                as: "order_details"
            }
           }
        ]);
      
        res.status(200).send({ success: true, msg: "get category data", data: response })
    } catch (error) {
        res.status(400).send({ success: false, msg: "failed" })
    }
}


module.exports={
    Addinventory, addorder,getinv,lookupinv
}