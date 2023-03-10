import {useState, useEffect, useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import useFetch from '../../hooks/useFetch';
import axios  from 'axios';

// const API_BASE_LOCAL = "http://localhost:3000"

// const API_BASE_LOCAL = "https://crud-todo-v2.onrender.com"

// const API_BASE_LOCAL = "https://todo-v3-server.onrender.com"

// const API_BASE_LOCAL = "https://todo-v3-server.onrender.com"

const Todo =()=> {

const [todos, setTodos] = useState([])
const [popupActive, setPopupActive] = useState(false)
const [newTodo, setNewTodo] = useState([])



const {user} = useContext(AuthContext)

//   GET all tasks............................

const {data} = useFetch(`/todos/retrieve/${user._id}`)
   
useEffect(()=> {
    setTodos(data)
      }, [data])
// --------------------------------------------


//Function to add Tasks to server.....................
//   const addTodo = async ()=> {

//     if(newTodo.length > 0){
//       const data = await fetch(API_BASE_LOCAL + `/todos/new/${user._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type" : "application/json"
//         },
//         body: JSON.stringify({
//           text: newTodo
//         })
//       }).then(res => res.json())
  
//       setTodos([...todos, data])
//       setPopupActive(false);
//       setNewTodo("");
//     }
//   }

const addTodo = async ()=> {

    if(newTodo.length > 0){
        try{

            const data = await axios.post(`/todos/new/${user._id}`, 
            {text:newTodo})
   
            setTodos([...todos, data])
            setPopupActive(false);
            setNewTodo("");
        } catch(err){
            console.log(err)
        }
    }
  }



//Function to delete Tasks from server.....................
//   const deleteTodo= async (id)=>{
//      await fetch(API_BASE_LOCAL + "/todos/delete/" + id, {
//       method: "DELETE"
//     }).then(res => res.json())
 

//     setTodos(todos => todos.filter(todo => todo._id !== id))
//   }

const deleteTodo = async (id) => {
  try{
    await axios.delete(`/todos/delete/${id}`)
    setTodos(todos.filter((todo) => todo._id !== id));
  }catch(err){
      console.log(err)
  }
};
//   //Function to mark Tasks as done from server.....................
//   const completeTodo= async (id)=>{
//     const data = await fetch(API_BASE_LOCAL + "/todos/complete/" + id)
//     .then(res=> res.json())
   
//     setTodos(todos => todos.map(todo=>{
//       if(todo._id === data._id){
//         todo.complete = data.complete
//       }

//       return todo
//     }))
//   }








  return (
    <div className="App">
      <h1> Welcome, {user.username}.</h1>
      <h4> Your Tasks</h4>
     
      <div className="todos"> 
      {todos.map(todo =>(
        // <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}> 
        <div className="todo " key={todo._id}> 
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

export default Todo;
