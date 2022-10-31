import {Button, TextField, Alert} from "@mui/material"
import { useState } from "react"
import axios from "axios"
import "./login.css"
import { useNavigate } from "react-router-dom";
const api = axios.create({
    baseURL:"http://www.localhost:3001"
})
const Login = ({username, setUsername, isAdmin, setIsAdmin, checkAdmin, check}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate();


    const handleSubmit = () => {
        
        api.post('/login', user)
        .then((res) => {
            const data = res.data
            setError(data.error)
            setMessage(data.message)
            if(data){
                localStorage.setItem('User', JSON.stringify(data))
            }
            if(!data.error){
                return (navigate('/'), window.location.reload())
                
            }
        })
    }

    return(
        <div className="login-div">
            {error ? (
                <Alert severity="error">{message}</Alert>
                
            ):
            null
            }
            
            <h1>Login</h1>
            <label htmlFor="">username</label>
            <TextField 
            size="small"
            type="text"
            onChange={(e) => setUser({...user,username: e.target.value})}
            value={user && user.username}
            required
            autofocus/>
            <br />
            <label htmlFor="">password</label>
            <TextField 
            size="small" 
            type="password" 
            onChange={(e) => setUser({...user,password: e.target.value})}
            value={user && user.password}
            required
            />
            <br />
            <Button 
            variant="contained"
            onClick={handleSubmit}>Login</Button>
        </div>
    )
}

export default Login