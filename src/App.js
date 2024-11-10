import React, { useState } from "react";
import Todoform from "./components/Todoform";
import "./App.css";
import Todo from "./components/Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoToshow, setTodoToShow] = useState("all");
  const [toggleAllComplete, setToggleAllComplete] = useState(true);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const removeAllTodosThatAreComplete = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoToShow = (s) => {
    setTodoToShow(s);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        }
        return todo;
      })
    );
  };

  let filteredTodos = todos;
  if (todoToshow === "active") {
    filteredTodos = todos.filter((todo) => !todo.complete);
  } else if (todoToshow === "complete") {
    filteredTodos = todos.filter((todo) => todo.complete);
  }

  return (
    <div className="container">
      <Todoform onSubmit={addTodo} />
      {filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onDelete={() => handleDelete(todo.id)}
          toggleComplete={() => toggleComplete(todo.id)}
        />
      ))}
      <div>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("all")}
        >
          All
        </button>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("active")}
        >
          Active
        </button>
        <button
          className="update-btn btn"
          onClick={() => updateTodoToShow("complete")}
        >
          Complete
        </button>
      </div>
      {todos.some((todo) => todo.complete) ? (
        <button onClick={removeAllTodosThatAreComplete} className="all-btn btn">
          Remove all complete todos
        </button>
      ) : null}
      <button
        className="all-btn btn"
        onClick={() => {
          setTodos(
            todos.map((todo) => ({
              ...todo,
              complete: !toggleAllComplete,
            }))
          );
          setToggleAllComplete(!toggleAllComplete);
        }}
      >
        Toggle all complete : {`${toggleAllComplete}`}
      </button>
    </div>
  );
};

export default App;
