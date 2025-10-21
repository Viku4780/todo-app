import React from 'react'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import TodoPage from './pages/TodoPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'


const App = () => {


  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<TodoPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<SignUpPage />} />
    </Routes>
      
    </BrowserRouter>

  )
}

export default App


