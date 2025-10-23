import React, { useState, useEffect } from 'react'
import LogoutImage from '../assets/logout.svg'
import axios from 'axios'
import TodoLists from '../components/TodoLists'
import { completedTodo } from '../utilis/countTodo'
import Header from '../components/Header'
import StarterSection from '../components/StarterSection'
import TodoInputContainer from '../components/TodoInputContainer'
import './TodoPage.css'
import { useNavigate } from 'react-router-dom'
import { TodoContext } from '../utilis/TodoContext'

const TodoPage = ({name}) => {
    const navigate = useNavigate();
    const [inputTodo, setInputTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const [isCompleted, setIsCompleted] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                if (!token) {
                    console.warn("No token found - redirecting to login");
                    return navigate("/login");
                }

                const res = await axios.get("http://localhost:3000/api/todos", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                // console.log("Fetched todos:", res.data);
                setTodos(res.data);

                completedTodo(res.data, setIsCompleted)
            } catch (error) {
                console.error("Error fetching todos:", error.response?.data || error.message);
               
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
            setLoading(false);
        };

        fetchData();

    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='todo-container'>

            <Header name={name} />

            <StarterSection todos={todos} isCompleted={isCompleted} />


            <TodoContext.Provider value={{ todos, setTodos, inputTodo, setInputTodo, isEditing, setIsEditing, editTodo, setEditTodo, isCompleted, setIsCompleted }}>

                <TodoInputContainer />

                <TodoLists />

            </TodoContext.Provider>

        </div>
    )
}

export default TodoPage
