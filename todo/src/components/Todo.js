import { useState, useContext } from "react";
import {BsCardHeading} from "react-icons/bs"
import {FaRegEdit, FaTrashAlt} from "react-icons/fa"
import { ModalContext } from "../context/ModalContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Todo = ({title, description, id, setFullScreenLoader}) => {

    const [showDesc, setShowDesc] = useState(false);    

    const { 
        setIsInputOn,
        setFormData, 
        setType,
        setTodoId,
        setFormSubmited,
        formSubmited
    } = useContext(ModalContext);


    function clicker(event){
        setShowDesc(!showDesc);
    }
    
    function editTodo(){
        setFormData({title, description});
        setType("Update");
        setTodoId(id);
        setIsInputOn(true);
    }

    const options = {
        title: 'Delete todo',
        message: 'Are you sure?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => deleteTodo()
            },
            {
                label: 'No'
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    function deleteTodo(){

        setFullScreenLoader(true);
        axios.post("https://todo-app.cyclic.cloud/api/v1/deleteTodo", {id:id})
        .then(res => {
            if(res.status === 200){
                toast.success("Todo is deleted!");
                setFormSubmited(!formSubmited);
            }else{
                toast.error("Unable to delete todo!");
            }
            setFullScreenLoader(false);
        })
        .catch(err => {
            toast.error("Internal server error!");
            console.log("Internal server error.")
            console.log(err);
            setFullScreenLoader(false);
        })
    }

    function deleteTodoConfirm(){
        confirmAlert(options);
    }

    return (
        <div className="todo" >
            <h2 className="todo-heading">
            <span onClick={clicker} ><BsCardHeading/>{title}</span>
            <span >
                <FaRegEdit className="todo-options" onClick={editTodo}/>
                <FaTrashAlt className="todo-options" onClick={deleteTodoConfirm} />
            </span>
            </h2>
            {
                showDesc && <p className="todo-desc">{description}</p>
            }
        </div>    
    )
}