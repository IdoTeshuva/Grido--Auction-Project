import './App.css';
// import {Button} from "@mui/material"
import Register from './components/Register';
import Login from './components/Login';
import Items from './components/Items';
import axios from "axios"
import {Link, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Footer from './components/Footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
// import { trusted } from 'mongoose';

const api = axios.create({
  baseURL:"http://www.localhost:3001"
})

function App() {
  const [username, setUsername] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState(false)

useEffect(() => {
  const userData = 
  JSON.parse(localStorage.getItem('User'))
  if(userData){
    setUsername(userData.username)
  }
}, [])

useEffect(() => {
  check()
})
const check =() => {
  if (username === "admin"){
    setIsAdmin(true)
  }
}



  const logout = () => {
    window.location.reload()
    localStorage.removeItem('User')
  }

  const checkAdmin = () => {
    api.get('/login')
    .then((res) => {
      const data = res.data
      setError(data.error)
      if (!error){
        setIsAdmin(true)
      }

  })
  }
console.log(isAdmin);

  return (
    
    <div className="App">
      <div className='navbar'>
       <Link className='h2grido' to="/"> <h2>GRIDO</h2></Link>
        <ul className='ul-navbar'>

       <li><Link to="/">Home</Link></li> 
       <li> <Link to="/register">register</Link></li> 
       <li><Link to="/login">login</Link></li> 

       {username && (
         <li className='hello'><AccountCircleIcon/> Hello, <strong> {username}</strong></li>
       )}

       {username &&(

         <li className='logout'> <a onClick={logout}>Log Out</a></li>
       )}
        </ul>
      </div>
      <Routes>
     <Route path ='/'element={
     <div>
     <Home username= {username} setUsername = {setUsername}/>
     <Items username= {username} setUsername = {setUsername} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
     <Footer/>
     </div>} />
     <Route path ='/register'element={<Register/>} />
     <Route path ='/login'element={<Login username= {username} setUsername = {setUsername} isAdmin = {isAdmin} setIsAdmin = {setIsAdmin} checkAdmin={checkAdmin} check={check}/>} />
      </Routes>
    </div>
  );
}

export default App;
