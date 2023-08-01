/// import 
const Todo = require('../models/Todo');

// define the route handler.
exports.createTodo = async(req, res) => {

    try {
        // extract title and description
        const {title, description} = req.body;
        // create todo object and insert into db
        const response = await Todo.create({title, description});
        // send json response
        res.status(200).json({
            success:true,
            data:response,
            message:"Entry created succesfully!"
        });
        console.log("Entry added.");
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        })
    }
}
