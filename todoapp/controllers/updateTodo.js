const Todo = require("../models/Todo")


exports.updateTodo = async(req, res) => {

    try{
        console.log("Update requested");
        console.log(req)
        const id = req.params.id;
        const {title, description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            {_id: id},
            {title, description, updatedAt:Date.now()}    
        )
        
        if(todo){
            res.status(404).json({
                succes:true,
                data:todo,
                message:"Todo updated with id: " + id
            })
        }else{
            res.status(404).json({
                succes:false,
                data:"",
                message:"Todo not found!"
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