import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { stringify, v4 as uuidv4 } from 'uuid';
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const LOCAL_STORAGE_KEY = "todoApp.todos"
  const formattedTime = currentTime.toLocaleTimeString()

  const todoNameRef = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if (storedTodos) setTodos(storedTodos)
    } catch (error) {
      // Handle the error here, or provide fallback behavior
      console.error('Error parsing JSON:', error.message);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    console.log(id)
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete
    todo.time = formattedTime
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') {
      shakeButton("addButton")
      return
    }
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function shakeButton(buttonName) {
    document.getElementById(buttonName).classList.add("shake")
      setTimeout(function () {
        document.getElementById(buttonName).classList.remove("shake")
      }, 600)
      return
  }

  function handleRemoveTodo() {
    const prevLength = todos.length
    const newTodos = todos.filter(todo => todo.complete != true)

    if (prevLength == newTodos.length) {
      shakeButton("removeButton")
      return
    }

    setTodos(newTodos)
    todoNameRef.current.value = null
  }

  function clearStorage() {
    if(todos.length == 0) {
      shakeButton("resetButton")
      return
    }
    localStorage.clear()
    window.location.reload()
  }

  function getCurrentDateInfo() {
    const currentDate = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    const year = currentDate.getFullYear();
    var suffix = ""

    if (dayOfMonth == 1) {
      suffix = "st, "
    } else if (dayOfMonth == 2) {
      suffix = "nd, "
    } else if (dayOfMonth == 3) {
      suffix = "rd, "
    } else {
      suffix = "th, "
    }

    const day = dayOfWeek + ", " + month + " " + dayOfMonth + suffix + year

    return day
  }

  return (
    <>
      <label className="date">
        {getCurrentDateInfo()}
      </label>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <div className="inputContainer">
        <input type="text" placeholder='Todo Name...' ref={todoNameRef} />
        <div className="buttonContainer">
          <button id="addButton" className="button" onClick={handleAddTodo}>Add Todo<span /></button>
          <button id="removeButton" className="button" onClick={handleRemoveTodo}>Remove Todo<span /></button>
          <button id="resetButton" className="button" onClick={clearStorage}>Reset Todos<span /></button>
        </div>
      </div>
    </>
  )
}

export default App;
