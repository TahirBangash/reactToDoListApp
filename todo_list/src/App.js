import React, {useState} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing]= useState(null);
  
  function handleSubmit(e) {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value

    const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    };

    if (newTodo.text.length > 0){
        setTodos([...todos].concat(newTodo));
    }
    else{ alert("Enter Valid Task")};

    document.getElementById('todoAdd').value = ""

  }
  
  
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  
  function toggleComplete(id){
    let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id){
            todo.completed = !todo.completed;
        }

        return todo;
    })
    setTodos(updatedTodos);
  }

  
  function submitEdits(editedtodo){
    const updatedTodos = [...todos].map((index)=> {
        if (index.id === editedtodo.id){
            index.text = document.getElementById(editedtodo.id).value;

        }
        return index;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  
return(
<div id="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
        <input type ="text" align ="right" id= 'todoAdd' placeholder="enter a task"/>
        <button type ="submit">Add Todo</button>
    </form>
    {todos.map((task) => 
        <div className="todo" key = {task.id}>
            
            <div className="todo-text">
                 
                <input type="checkbox" id="completed" checked={task.completed} onChange={() => toggleComplete(task.id)}/>
                {task.id === todoEditing?(
                    <input type="text" id = {task.id} defaultValue = {task.text}/>
                )
                :
                (<div>{task.text}</div>)
                }
            </div>
            <div className="todo-actions">
                {task.id === todoEditing ? 
                (<button onClick={() => submitEdits(task)}>Submit Edits</button>)
                :
                (<button onClick={() => setTodoEditing(task.id)}>Edit</button>)}
                <button onClick={() => deleteTodo(task.id)}>Delete</button>
            </div>
            
        </div>
    )}
</div>
);
};
export default App;
