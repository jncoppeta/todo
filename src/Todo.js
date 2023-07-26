import React from 'react'
import './Todo.css'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        console.log(todo)
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label className="container" >
                <input className="label-left" type="checkbox" onClick={handleTodoClick} />
                <span id={todo.id} className="checkmark" checked={todo.complete} />
                <div className="labelContainer">
                    <label className="label-left" id="left-label">
                        {todo.name}
                    </label>
                    {todo.complete && <label className="label-right"  id="right-label">
                        {todo.time}
                    </label>}
                </div>
            </label>
        </div>
    )
}