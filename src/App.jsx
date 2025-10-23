import React, { useEffect,useState } from 'react'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import TodoPage from './pages/TodoPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import axios from 'axios'


const App = () => {
  const [name,setName] = useState("");
  const token = localStorage.getItem("token")

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        setName(res.data.name);
      } catch (err) {
        console.error("failed to fetch user data:", err);
      }
    }
    fetchUser();
  }, [token]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <TodoPage name={name} />
          </PrivateRoute>
        }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App


