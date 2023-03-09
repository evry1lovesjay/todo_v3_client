import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Todo from './pages/todo/Todo';
import Register from './pages/register/Register';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/todos" exact element={<Todo />} />
          <Route path="/" element={<Login/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
