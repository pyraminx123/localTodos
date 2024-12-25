import { useState } from 'react'
import './App.css'

interface Todo {
  text: string;
}

function App() {
  const [todoText, setTodoText] = useState("");
  const currTodosJSON = localStorage.getItem("todos");
  const initialTodos: Todo[] = currTodosJSON ? JSON.parse(currTodosJSON) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const onSubmit = (newTodoText: string) => {
    if (!newTodoText) return; // if it is empty
    setTodoText("");
    const newTodos = [...todos, { "text": newTodoText }];
    //console.log(newTodos)
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const onDelete = (indexToRemove: number) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToRemove);
    //console.log(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo list that stores your data locally</h1>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a new todo..."
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSubmit(todoText);
            }
          }} />
        <button className="add-button" onClick={() => onSubmit(todoText)}>
          Add
        </button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo-item">
              <p className="todo-text">{todo.text}</p>
              <button className="delete-button" onClick={() => onDelete(index)}>
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App
