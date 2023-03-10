import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css"
import { axiosInstance } from './../../utils';

const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate= useNavigate()

    const handleChange = (e) =>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        dispatch({type:"REGISTER_START"})
        try{
            const res = await axiosInstance.post("/auth/register", credentials)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data.details})
            navigate("/")
        }catch(err){
            dispatch({type:"REGISTER_FAILED", payload: err.response.data})
        }
    }

    return ( <div className="register">
        <div className="rContainer">
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="rInput" />
            <input type="email" placeholder="email" id="email" onChange={handleChange} className="rInput" />
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="rInput" />
            <button disabled={loading} className="lButton" onClick={handleClick}>Register</button>
            {error && <span>{error.message}</span>}
        </div>
    </div> );
}
 
export default Register;