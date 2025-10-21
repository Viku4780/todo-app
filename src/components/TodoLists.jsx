import React, { useContext } from 'react'
import './TodoLists.css'
import PencilImage from '../assets/pencil.svg'
import DeleteImage from '../assets/delete.svg'
import axios from 'axios'
import { TodoContext } from '../pages/TodoPage'
import { completedTodo } from '../utilis/countTodo'

const TodoLists = () => {
    const { todos, setTodos, setInputTodo, setIsEditing, setEditTodo,setIsCompleted } = useContext(TodoContext);

    function updateTodo(data) {
            // const todo = todos.findOne({ _id: data._id }); we can not use because it is a built in method for mongoDB not general js array method thats why here we are going to use find()
            const list = todos.find(item => item._id === data._id);
            setInputTodo(list.todo);
            setIsEditing(true);
            setEditTodo(list);
    }

    async function deleteTodo(data) {
        try {
            await axios.delete(`http://localhost:3000/api/todos/${data._id}`);
            const deletedTodo = todos.filter(item => item._id !== data._id)
            setTodos(deletedTodo);

            completedTodo(deletedTodo,setIsCompleted);
        } catch (err) {
            console.error(err);
        }
    }


    function toggleComplete(data) {
        const updatedTodos = todos.map(item =>
            item._id === data._id ? { ...item, completed: !item.completed } : item
        );
        setTodos(updatedTodos);

        completedTodo(updatedTodos,setIsCompleted);

        axios.put(`http://localhost:3000/api/todos/${data._id}`, {
            completed: !data.completed
        });
    }


    return (
        <div className="todo-list-container">

            {todos.length > 0 && todos.map((item) =>

                <div key={item._id} className="todo-list">

                    <div className="list">
                        <div
                            className={item.completed ? "circle green" : "circle"}
                            onClick={() => toggleComplete(item)}
                        ></div>
                        <p
                        className={item.completed ? "line-through" : ""}
                        >{item.todo}</p>
                    </div>

                    <div className="btns">
                        <button
                            className="edit"
                            onClick={() => updateTodo(item)}
                        >
                            <img src={PencilImage} alt="edit" />
                        </button>

                        <button
                            className="delete"
                            onClick={() => deleteTodo(item)}
                        >
                            <img src={DeleteImage} alt="delete" />
                        </button>

                    </div>

                </div>
            )
            }

        </div>
    )
}

export default TodoLists
