const Todo = require("../models/Todo")

exports.getTodos = async(req, res) => {
    console.log("Fetching all todos");
    try{
        // console.log(req)
        const response = await Todo.find();
        res.status(200).json({
            success:true,
            data:response,
            message:"Data Found!"
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            data:[],
            message:"No data found!"
        })
    }
}

exports.getTodoById = async(req, res) =>{
    console.log("Fetching todo by ID");
    try{
        const id = req.params.id;
        
        const todo = await Todo.findById({_id: id});

        if(!todo){
            res.status(404).json({
                succes:false,
                data:"",
                message:"Todo not found!"
            })
        }else{
            res.status(200).json({
                success:true, 
                data:todo,
                message:"Todo found with id" + id
            })
        }
    }
    catch(err){
        res.status(404).json({
            succes:false,
            data:"",
            message:"Todo not found!"
        })
    }
}