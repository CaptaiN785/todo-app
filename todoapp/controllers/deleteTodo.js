const Todo = require("../models/Todo")


exports.deleteTodo = async(req, res) => {

    try{
        
        const id = req.params.id;
        const {title, description} = req.body;

        const todo = await Todo.findByIdAndDelete({_id: id})
        
        if(todo){
            res.status(404).json({
                succes:true,
                data:todo,
                message:"Todo deleted with id: " + id
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