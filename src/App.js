import {useState, useEffect} from "react"

import './App.css';

// const API_BASE_LOCAL = "http://localhost:3001"

const API_BASE = "https://crud-todo-v2.onrender.com"

function App() {

const [todos, setTodos] = useState([])
const [popupActive, setPopupActive] = useState(false)
const [newTodo, setNewTodo] = useState([])

  //GET all tasks............................
  useEffect(()=> {
    GetTodos()
  }, [])


  //Function to get all Tasks/todos from server.....................
  const GetTodos=()=>{
    fetch(API_BASE + "/todos")
    .then(res=> res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: ", err))
  }

  //Function to mark Tasks as done from server.....................
  const completeTodo= async (id)=>{
    const data = await fetch(API_BASE + "/todos/complete/" + id)
    .then(res=> res.json())
   
    setTodos(todos => todos.map(todo=>{
      if(todo._id === data._id){
        todo.complete = data.complete
      }

      return todo
    }))
  }


  //Function to delete Tasks from server.....................
  const deleteTodo= async (id)=>{
    const data = await fetch(API_BASE + "/todos/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json())
   

    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }


  //Function to add Tasks to server.....................
  const addTodo = async ()=> {

    if(newTodo.length > 0){
      const data = await fetch(API_BASE + "/todos/new/", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          text: newTodo
        })
      }).then(res => res.json())
  
      setTodos([...todos, data])
      setPopupActive(false);
      setNewTodo("");
    }

  }

  return (
    <div className="App">
      <h1> Welcome, User</h1>
      <h4> Your Tasks</h4>
     
      <div className="todos"> 
      {todos.map(todo =>(
        <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}> 
          <div className="checkbox"> </div>

          <div className="text"> {todo.text}</div>

          <div className="delete-todo" onClick={(e) => {e.stopPropagation(); deleteTodo(todo._id)}}>x</div>

        </div>
       ))}
      </div>



      <div className="addPopup" onClick={()=> setPopupActive(true)}>+</div>

      {popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}> x </div>
            <div className="content">
              <h3>Add Task</h3>
             
              <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
               <div className="button" onClick={addTodo}> Create Task </div>
            </div>
          </div>
        ) : ""}
    </div>
  );
}

export default App;
