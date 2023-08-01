import axios from "axios";
import { useState, useContext } from "react"
import { toast } from "react-hot-toast";
import { ModalContext } from "../context/ModalContext";
import { FullScreenLoader } from "./FullScreenLoader";


export const InputModal = () => {
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const { 
        setIsInputOn, 
        formData, 
        setFormData, 
        initialFormData,
        formSubmited,
        setFormSubmited,
        type,
        todoId
    } = useContext(ModalContext);

    function changeHandler(event){
        setFormData((prevData) => {
            return {
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }


    function submitHandler(event){
        event.preventDefault();
        if(formData.title === "" || formData.description === ""){
            toast.error("Write something to add");
            return;
        } 

        setFullScreenLoader(true);

        if(type === "Add"){
            axios.post('https://todo-app.cyclic.cloud/api/v1/createTodo', formData)
            .then(res => {
                if(res.status === 200){
                    setFormData(initialFormData);
                    toast.success("Todo is added!");
                    setFormSubmited(!formSubmited);
                    setIsInputOn(false)
                }else{
                    toast.error("Unable to add todo!");
                }
                setFullScreenLoader(false);
                setIsInputOn(false);
            })
            .catch(err => {
                toast.error("Internal server error!");
                console.log("Internal server error.")
                console.log(err);
                setFullScreenLoader(false);
                setIsInputOn(false);
            })
        }else{
            const updateData = {
                ...formData,
                id:todoId
            }
            // update it.
            axios.post("https://todo-app.cyclic.cloud/api/v1/updateTodo", updateData)
            .then(res => {
                if(res.status === 200){
                    setFormData(initialFormData);
                    setFormSubmited(!formSubmited);
                    toast.success("Todo is updated!");
                }else{
                    toast.error("Unable to update todo!");
                }
                setFullScreenLoader(false);
                setIsInputOn(false);
            })
            .catch(err => {
                toast.error("Internal server error!");
                console.log("Internal server error.")
                console.log(err);
                setFullScreenLoader(false);
                setIsInputOn(false);
            })
        }
    }

    return (
        <div className="modal">
            {
                fullScreenLoader && <FullScreenLoader/>
            }
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{type} your todo here.</h2>
                    <button 
                    onClick={() => {setIsInputOn(false)}}
                    type="button" className="modal-close-btn">X</button>
                </div>
                <div className="modal-body">
                    <form onSubmit={submitHandler}>
                        <div className="input-control">
                            <label>Enter todo title</label>
                            <input 
                                type="text"
                                name="title" 
                                placeholder="title"
                                maxLength={50}
                                value={formData.title}
                                onChange={changeHandler} >
                            </input>
                        </div>
                        <div className="input-control">
                            <label>Enter todo description</label>
                            <textarea 
                                name="description" 
                                placeholder="todo description"
                                maxLength={100}
                                value={formData.description}
                                onChange={changeHandler} >
                            </textarea>
                        </div>
                        <div className="input-control">
                            <button type="submit">{type}</button>
                        </div>
                    </form>
                </div>
                {/* <div className="modal-footer">
                    
                </div> */}
            </div>
        </div>    
    )
}