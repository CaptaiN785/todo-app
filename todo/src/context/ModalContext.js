import { createContext } from "react";
import { useState } from "react";

const initialFormData = {
    title:"",
    description:""
}

export const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {

    const [isInputOn, setIsInputOn] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formSubmited, setFormSubmited] = useState(false);
    const [type, setType] = useState("Add");
    const [todoId, setTodoId] = useState(null);

    const value = {
        isInputOn,
        setIsInputOn,
        formData,
        setFormData,
        initialFormData,
        formSubmited,
        setFormSubmited,
        type,
        setType,
        todoId, 
        setTodoId
    }

    return <ModalContext.Provider value={value}>
        {children}
    </ModalContext.Provider>
}