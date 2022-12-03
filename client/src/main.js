import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import date from "./date/imgs.json"

export default function Main() {
  const [xx, setxx] = useState(0)
  const [x, setx] = useState(0)
  const info = date;
  const [message, setmessage] = useState()
  const [mensaje, setmensaje] = useState([])
  const [y, sety] = useState(0)
  
var f = new Date(); 
var fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

  useEffect(()=>{
    if (window.localStorage.getItem("user") === "x" || window.localStorage.getItem("user") == null || window.localStorage.getItem("user") == ""){setx(0)}
    else setx(1)
    fetch("/username/messages")
  .then(res => {return res.json()})
  .then(resp => setmensaje(resp))  
  },[y])

  





  return (
    <div className='container-fluid conte'>
      <div className='row text-center mt-5'>
    <h1 className='mb-5'>Image Gallery</h1>
    <div className='links'>
    <div className={x === 0 ? "mb-3" : "inactive"}><Link to='/register'>Click here to create an account</Link></div>
    <div className={x === 0 ? "mb-4" : "inactive "}><Link to='/login'>Click here to login</Link></div>
    </div>
    <div >
    <button className={x === 1 ? "col-8 log-out" : "inactive"} onClick={(e)=>{
      window.localStorage.setItem("user", "x")
      window.location.reload();
    }}>Log out</button></div>
    <h2 className={x === 1 ? "mt-5 mb-4" : "inactive"}>WELCOME {window.localStorage.getItem("user")}!</h2>
    </div>

    <div>
      {
        info.map((stat)=>{
          let image = require(`./date/${stat.img}.jpg`)
          return (
            <div className='mt-5 flex text-center' key={stat.id}>
              <h3 className={x === 0 ? 'not text-center' : "inactive"}>Log in to see the image</h3>
              <img className={x === 0 ? 'imgs distor' : 'imgs'} src={image} alt={stat.name}/>
              <div className='img-contain'>
              <h2 className=''>{stat.name}</h2>
              <h3>{stat.autor}</h3>
              <p className='mt-4'>{stat.descripcion}</p>
              </div>
            </div>
          )
        })
      }

    </div>

      <div className='mt-2 text-contain'>
        <h2 className='text-center'>Comments: </h2>
        <form onSubmit={(e)=>{
          e.preventDefault();

          if(message === null || message.length < 10 || message.length > 100){window.alert("The message must have more than 10 characters and max 100 characters")}
          else if (window.localStorage.getItem("user") === "x" || window.localStorage.getItem("user") === null || window.localStorage.getItem("user") === "" ){window.alert("You must register to be able to post comments")}
          else
          {fetch("/username/messages", {
          method: "Post",
          headers: {
            "accept": "application/json",
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: window.localStorage.getItem("user"),
            mess: message,
            datee: JSON.stringify(fecha)
          })})
          sety(y + 1)
          setmessage(null)
          document.querySelector(".text").value = ""
        }

        }
        
        } className='row mt-4 '>
        <textarea onChange={(e)=>setmessage(e.target.value)} required placeholder='Leave your comment here' className='mb-4 text col-12' />
        <div className='text-22'>
        <input className='mb-4 col-3 text-22' type="submit" />
        </div>
        </form>
      </div>
      <div>
        {mensaje.map((stat)=>{
          if (window.localStorage.getItem("user") === stat.name){
            return (
              <div className='message-contain mt-3 row' key={stat.id}>
                <p className='text-center'>{stat.datee}</p>
                <h2 className='name col-4 col-xl-2'>{stat.name}:</h2>
                <p className='col-8 col-xl-10 pepe'>{stat.mess}</p>
                <div className='bot text-center col-12'>
                <button onClick={()=>{
                  setxx(stat.id)
                  fetch(`/username/messages/${stat.id}`, {
                    method: "DELETE",
                    headers: {
                      "accept": "application/json",
                      "content-type": "application/json"
                    },
                    })
                    sety(y + 1)
                }

                
                  }
                 className={xx == stat.id ?"inactive" : `bot2 p${stat.id}`}>🗑️</button>
                </div>
              </div>
            )
          }
          return (
            <div className='message-contain mt-3 row' key={stat.id}>
              <p className='text-center'>{stat.datee}</p>
              <h2 className='col-5 col-xl-2 name'>{stat.name}:</h2>
              <p className='col-7 col-xl-10 pepe'>{stat.mess}</p>
            </div>
          )
        })}
      </div>

      <footer className='row fo text-center mt-4'>
        <p className='mt-3'>© Angelo Smorlesi. All rights reserved.</p>
      </footer>
    </div>
  )
}
