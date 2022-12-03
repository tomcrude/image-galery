
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

    const [name, setname] = useState()
    const [pass, setpass] = useState()
    const [regis, setregis] = useState([])
    const [x, setx] = useState(0)
    const [event, setevent] = useState(0)

    useEffect(()=>{
      window.localStorage.setItem("user", "")
      fetch("/username")
      .then(res => {return res.json()})
      .then(resp => setregis(resp))
    },[x])

  return (
    <div className="container text-center regis">
        <h2 className="mt-5">Complete your data</h2>
        <form className="row mt-4">
            <input onChange={(e)=>{setname(e.target.value)}} placeholder="Username" required type="text"/>
            <input onChange={(e)=>{setpass(e.target.value)}} placeholder="Password" className="mt-4" required type="password"/>
            <input onClick={async (e)=>{e.preventDefault();
        setx(x + 1)
        if (name == null || pass == null || name.length > 10 || pass.length > 15){window.alert("Complete the data well")}
        else {
          await fetch("/username")
          .then(res => {return res.json()})
          .then(res => setregis(res))

          await regis.map((stat )=>{ 
            if(stat.name == name && stat.pass == pass){navigate("/");
            window.localStorage.setItem("user", name)
          }
          })
          setevent(event + 1)
        }      
     
        }} className="mt-5" required type="submit"/>
        </form>
        <h3 className={x != 0 ? "mt-5" : "mt-5 inactive"}>The data is wrong</h3>
    </div>
  )
}
