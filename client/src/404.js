import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Error() {

    const image = require("./sad.png")
    const navigate = useNavigate()
    useEffect(()=>{
        setTimeout(() => {
            navigate("/")
        }, 3000);
    })

  return (
    <div className='container'>
      <div className='row text-center mt-5'>
        <div className="img mb-4"><img src={image} width={300} alt="Sad face"/></div>
        <h1>The requested page does not exist</h1>
        <p className="mt-3 error-404">you will be redirected in 3 seconds</p>
    </div>
    </div>
  )
}
