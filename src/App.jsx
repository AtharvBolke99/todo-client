import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { Toaster, toast } from "react-hot-toast";
import { SquarePen, Trash } from "lucide-react";

function App() {

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [oldTodo, setOldTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loaddata = async () => {
    const response = await axios.get(`${BASE_URL}/`);
    setTodos(response.data.data);
  };

  const addTask = async () => {
    await axios.post(`${BASE_URL}/todos`, {
      todo: newTask,
    });
    loaddata();
    // console.log(response.dada.data);
  };

  const deleteTask = async (todo) => {
    await axios.delete(`${BASE_URL}/todos`, {
      data: { todo: todo },
    });
    loaddata();
  };

  const updateTask = async (oldTodo, newTask) => {
    await axios.put(`${BASE_URL}/todos`, {
      oldTodo: oldTodo,
      newTodo: newTask,
    });
    loaddata();
  };

   useEffect(() => {
    loaddata();
  }, []);
  return (
    <div>
      <h1 className="header">ToDO App</h1>
      <div className="task-card">
        {todos.map((todo, index) => {
          return (
            <div key={index} className="card">
              {todo}
              <div className="edit-delete-box">
                <SquarePen
                  onClick={() => {
                    setIsEditing(true);
                    setOldTodo(todo);
                    setNewTask(todo);
                  }}
                />
                <Trash
                  onClick={() => {
                    deleteTask(todo);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="input-box">
        <input
          className="todo-input-box"
          type="text"
          placeholder="Enter the Task"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button
          className="btn"
          onClick={() => {
            if (newTask === "") {
              toast.error("Enter The Task!");
              return;
            }

            if (isEditing) {
              updateTask(oldTodo, newTask);
              setIsEditing(false);
              setOldTodo("");
              setNewTask("");
              return;
            } else {
              addTask();
              setNewTask("");
            }
          }}
        >
          {isEditing ? "Edit Task" : "Add Task"}
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
