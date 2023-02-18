const Employee = require('../model/employee')

const addemp = async (req, res) => {
    console.log(req.body);
    try {
        const emp = await new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            email: req.body.email,
            salary: req.body.salary,
            department: req.body.department
        })
        console.log(emp);
        const emp_data = await emp.save();
        res.status(200).send({ success: true, msg: "add employee data", data: emp_data })
    } catch (error) {
        //console.log(error);
        //res.status(400).send({ success: false, msg: "not save" })
        res.status(201).json({ error })
    }
}


const all = async (req, res) => {
    console.log(req.body);
    try {
        const empData = await Employee.find()
        res.status(200).send({ success: true, msg: "All employee data", data: empData })
    } catch (error) {
        //console.log(error);
        //res.status(400).send({ success: false, msg: "not save" })
        res.status(201).json({ error })
    }
}

//metch data
const metchdata = async (req, res) => {
    try {
        const empData = await Employee.aggregate([
            {
                $match: { gender: 'female' }
            }
        ])
        res.status(200).send({ success: true, msg: "All employee data", data: empData })
    } catch (error) {
        res.status(201).json({ error })
    }

}
// group data
const gruopdata = async (req, res) => {
    try {
        //**normal group
        // const empData = await Employee.aggregate([ 
        //     { $group:{ _id:'$department.name'} }
        // ])

        //**Example: Get Accumulated Values
        // const empData = await Employee.aggregate([
        //     {
        //         $group: {
        //             _id: '$department.name', totalEmployees: { $sum: 1 }
        //         }
        //     }])

        //**Example: $match and $group */
        const empData = await Employee.aggregate([
            {
                $match: { gender: 'male' }
            },
            { $group: { _id: { deptName: '$department.name' }, totalEmployees: { $sum: 1 } } },
            {
                $sort: { deptName: 1 }
            }
        ])

        res.status(200).send({ success: true, msg: "All employee data", data: empData })
    } catch (error) {
        res.status(201).json({ error })
    }
}

//sort and match
const sortdata=async(req,res)=>{
    try {
        const empData = await Employee.aggregate([
            { $match:{ gender:'male'}}, 
            { $sort:{ firstName:1}}
        ])
        res.status(200).send({ success: true, msg: "All employee data", data: empData })
    } catch (error) {
        res.status(201).json({ error })
    } 
}
module.exports = {
    addemp, all, metchdata, gruopdata,sortdata
}