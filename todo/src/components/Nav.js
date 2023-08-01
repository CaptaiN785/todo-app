import { useContext, useState } from "react"
import { InputModal } from "./InputModal";
import { ModalContext } from "../context/ModalContext";

export const Nav = () => {

    const {isInputOn, setIsInputOn, setType, initialFormData, setFormData} = useContext(ModalContext);

    function showModal(){
        setType("Add");
        setFormData(initialFormData);
        setIsInputOn(true);
    }

    return (
        <div className="navbar">
            <a className="logo" href="">ToDo</a>
            <button type="button" className="add-todo" onClick={showModal}>
                <span className="plus-icon">+</span> 
                Add todo
            </button>

            {
                isInputOn && 
                <InputModal/>
            }
            
        </div>    
    )
}