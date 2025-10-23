import React, { useContext } from 'react'
import './TodoInputContainer.css'
import axios from 'axios'
import { TodoContext } from '../utilis/TodoContext'

const TodoInputContainer = () => {
    const { todos, setTodos, inputTodo, setInputTodo, isEditing, setIsEditing, editTodo, setEditTodo } = useContext(TodoContext);

    function handleChange(e) {
        setInputTodo(e.target.value)
    }

    async function addTodo() {
        try {
            if (!isEditing) {
                // Create new todo
                const res = await axios.post("http://localhost:3000/api/todos", { todo: inputTodo , completed: false }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                console.log(res)
                setTodos(prev => [...prev, res.data.createTodo]);
            } else {
                // Edit existing todo
                const res = await axios.put(`http://localhost:3000/api/todos/${editTodo._id}`, { todo: inputTodo }, {
                    headers: {

                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const updatedTodos = todos.map(item =>
                    item._id === editTodo._id ? res.data.todo : item
                );

                setTodos(updatedTodos);
                setIsEditing(false);
            }
            setInputTodo("");

        } catch (error) {
            console.error("Error adding/editing todo:", error);
        }

    }

    function cancelEditing() {
        setInputTodo("");
        setIsEditing(false);
        setEditTodo(null);
    }

    return (
        <div className="todo-generator-container">

            <input
                type="text"
                placeholder='write your next task'
                value={inputTodo}
                onChange={handleChange}
            />

            {isEditing && (
                <div
                    className="cancel"
                    onClick={cancelEditing}
                >
                    <div className=" v-line"></div>
                    <div className=" h-line"></div>
                </div>
            )}

            <div
                className="add"
                onClick={addTodo}
            >
                <div className=" v-line"></div>
                <div className=" h-line"></div>
            </div>

        </div>
    )
}

export default TodoInputContainer
