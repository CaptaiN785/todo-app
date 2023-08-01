const express = require('express');

const router = express.Router();

const {createTodo} = require("../controllers/createTodo");
const {getTodos, getTodoById} = require("../controllers/getTodos")
const {updateTodo} = require("../controllers/updateTodo")
const {deleteTodo} = require("../controllers/deleteTodo")

// define api routes
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos)
router.get("/getTodos/:id", getTodoById)
router.post("/updateTodo", updateTodo);
router.post("/deleteTodo", deleteTodo);

module.exports = router;