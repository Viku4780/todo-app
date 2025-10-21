import React, { useState, useEffect, createContext } from 'react'
import './App.css'
import LogoutImage from './assets/logout.svg'
import axios from 'axios'
import TodoLists from './components/TodoLists'
import { completedTodo } from './utilis/countTodo'
import Header from './components/Header'
import StarterSection from './components/StarterSection'
import TodoInputContainer from './components/TodoInputContainer'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

export const TodoContext = createContext();

const App = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [isCompleted, setIsCompleted] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/todos");
      setTodos(res.data);

      completedTodo(res.data, setIsCompleted)
    }

    fetchData();

  }, []);


  return (

    <div className='todo-container'>

      <Header />

      <StarterSection todos={todos} isCompleted={isCompleted} />


      <TodoContext.Provider value={{ todos, setTodos,inputTodo, setInputTodo,isEditing, setIsEditing,editTodo, setEditTodo,isCompleted, setIsCompleted }}>

        <TodoInputContainer />
        <TodoLists />

      </TodoContext.Provider>
    </div>
  )
}

export default App


