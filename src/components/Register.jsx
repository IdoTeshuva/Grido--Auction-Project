import axios from "axios"
import { useState } from "react"
import {Button, TextField, Alert} from "@mui/material"
import "./register.css"
import { useNavigate } from "react-router-dom";
const api = axios.create({
    baseURL: "https://gridoserver.cyclic.app"
})


const Register = () => {
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState({
        first_name: "",
        last_name:"",
        username:"",
        email:"",
        password:""
      })
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    
      const postUser = () => {
        api.post('/register', userData)
        .then((res) =>{ 
        const data = res.data
        setError(data.error)
        setMessage(data.message)
        if(!data.error){
            return navigate('/login')
        }
    })
    }

    const handleSubmit = () => {
        postUser()
        const usersList = [...users]
        usersList.push(userData)
        setUsers(usersList)
    }

    const handleChange = ({currentTarget: input}) => {
        setUserData({...userData, [input.name]:input.value})
    }
    console.log(message);
    return(
        <>
                <div>
            {error && (
                <Alert severity="error">{message}</Alert>
                
            )}
        </div>
        <div className="register-div">

            <h1>Register</h1>
            <label htmlFor="">first name</label>
            <TextField
            size="small"
            type="text" 
            value={userData.first_name}
            name="first_name"
            onChange={handleChange}/>
            <label htmlFor="">last name</label>
            <TextField
            size="small"
            type="text"
            value={userData.last_name}
            name="last_name"
            onChange={handleChange} />
            <label htmlFor="">username</label>
            <TextField
            size="small"
            type="text" 
            value={userData.username}
            name="username"
            onChange={handleChange}/>
            <label htmlFor="">email</label>
            <TextField
            size="small"
            type="text" 
            value={userData.email}
            name="email"
            onChange={handleChange}/>
            <label htmlFor="">password</label>
            <TextField
            size="small"
            type="text"
            value={userData.password}
            name="password"
            onChange={handleChange} />
            <br />
            <Button variant="contained" onClick={handleSubmit}>Register</Button>
        </div>

        </>
    )
}

export default Register