import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import Notes from './Components/Notes.jsx'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Nav from "./Components/Nav.jsx";
import Logout from "./Components/logout.jsx";
import ImpNotes from "./Components/ImpNotes.jsx";
import UpdateNote from "./Components/UpdateNote.jsx";

import Create from "./Components/Create.jsx";

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          
          <Route path="/important" element={<ImpNotes />}/>
          
          <Route path="/create" element={<Create />}/>
          
          <Route path={`/updatenote/:id`} element={<UpdateNote />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
