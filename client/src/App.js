import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./register";
import Main from "./main";
import Login from "./login";
import Error from "./404";


function App() {
return(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/username" element={<Error />} />
        <Route path="/*" element={<Error />} />
        
      </Routes>
    </BrowserRouter>
)
}

export default App;
