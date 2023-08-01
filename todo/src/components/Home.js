import { useContext, useEffect, useState } from "react"
import { Todo } from "./Todo"
import { Loader } from "./Loader";
import { toast } from "react-hot-toast";
import { ModalContext } from "../context/ModalContext";
import axios from "axios";
import { FullScreenLoader } from "./FullScreenLoader";

export const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allTodo, setAllTodo] = useState([])
    const {formSubmited} = useContext(ModalContext);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);

    async function fetchData(){
        setLoading(true);
        try{
            const res = await axios.get("https://todo-app.cyclic.cloud/api/v1/getTodos", {
                "mode":'no-cors',
                "access-control-allow-origin": "*",
                "access-control-allow-headers": "*"
            })
            const output = await res.data.data;
            setAllTodo(output.reverse());
        }
        catch(err){
            setAllTodo([]);
            console.log(err);
            toast.error("Unable to load todos");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData()
    }, [formSubmited])

    return (
        <div>
            <div className="backPattern">
                <h2 className="heading">Your Todos</h2>
            </div>
            <div className="container">
                {
                    loading ?
                    <Loader/>
                    :
                    allTodo.length > 0 ?
                    allTodo.map(todo => {
                        return <Todo 
                            key={todo._id}
                            title={todo.title}
                            description={todo.description}
                            id={todo._id}
                            setFullScreenLoader={setFullScreenLoader}
                            />
                    })  
                    :
                    <div className="not-found">
                        No Todo found
                    </div>              
                }
            </div>
            {
                fullScreenLoader && <FullScreenLoader/>
            }
        </div>    
    )
}