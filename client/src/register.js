
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



export default function Register() {

  const navigate = useNavigate()

  let state = false;

  const [name, setname] = useState()
  const [pass, setpass] = useState()
  const [regis, setregis] = useState([])
  const [x, setx] = useState(0)

  useEffect(()=>{
    window.localStorage.setItem("user", "")
    fetch("/username")
    .then(res => {return res.json()})
    .then(resp => setregis(resp))
  },[x])

  return (
    <div className="App">
      <form className='container mt-5 regis'>
       <div className='row'>
        <h2 className='text-center '>Enter a username</h2>
        <input onChange={(e)=>{setname(e.target.value)}} placeholder='Max 10 characters' className='mt-3' required type="text"/>
        <h2 className='text-center mt-3'>Enter a password</h2>
        <input  onChange={(e)=>{setpass(e.target.value)}} placeholder='Max 15 characters' className='mt-4' required type="password"/>

      <input className='mt-5' type="submit" onClick={async (e)=>{
        e.preventDefault();
        
        setx(x + 1)
        
        await regis.map(stat =>{
          if (stat.name === name){window.alert("the name is already in use"); state = true}
        })

        if (name == null || pass == null || name.length > 10 || pass.length > 15 ){window.alert("Complete the data well")}
        else if(state === false) {fetch("/username", {
          method: "Post",
          headers: {
            "accept": "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: name,
            pass: pass
          })
        })
        navigate("/")
        window.localStorage.setItem("user", name)
      }
        else state = false

      }} />
      </div>
    </form>
    </div>
  )
}
