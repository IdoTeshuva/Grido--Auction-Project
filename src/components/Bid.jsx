import { useState } from "react"
import {Button, TextField, Alert} from "@mui/material"
import axios from "axios"
const api = axios.create({
    baseURL: 'http://www.localhost:3001'
})

const Bid = ({id, item, setItem, items, counter, setCounter, GetItems, username, setUsername, endSale})=> {
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [openBid, setOpenBid] = useState(false)
    // const body = {user: item, username: JSON.parse(localStorage.getItem('User'))}
    const updateBid =  () => {
        api.patch(`/items/${id}`, item)
        .then((res) => {
            const data= res.data
            setError(data.error)
            setMessage(data.message)
        })
        if (item.bid <= item.price) {
            setError(true)
        }
        if(!error){
            setOpenBid(false)
            GetItems()
        }
    } 


console.log(message);
    return(
        <div>
            {error && (
                <Alert severity="error">ERROR : {message}</Alert>
             )}
             {username ?
            <Button variant="contained" onClick={() => setOpenBid(!openBid)}>{openBid? "Close" : "Place Your bid"}</Button>  
            :
            <Button disabled variant="contained" onClick={() => setOpenBid(!openBid)}>{openBid? "Close" : "Place Your bid"}</Button>
             }
            {endSale &&
            <Button disabled variant="contained" onClick={() => setOpenBid(!openBid)}>{openBid? "Close" : "Place Your bid"}</Button>
            }
                        <br />
                        <br />
                        {openBid && (
                            <>
                            <TextField 
                            size="small"
                            placeholder="Bid"
                            onChange={(e) => setItem({...item, bid: e.target.value})}
                            value={item && item.bid}/>
                            
                            <Button onClick={updateBid} > Submit </Button>
                            </>
                        )}
        </div>
    )
}

export default Bid