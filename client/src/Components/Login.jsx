import {Link,useNavigate} from 'react-router-dom'

import { LuLogIn } from "react-icons/lu";
import {useState,useEffect} from "react"
import axios from "axios"
const Login = ()=>{
    const navigate = useNavigate();
    const[userError,setUserError] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/user/isAuthenticated", { 
          withCredentials: true 
        });
        
        if (res.data.success) {
          navigate("/");
        }
     }catch (err) {
        console.log("User not authenticated", err);
      }
    };

    checkAuth();
  }, [navigate]);
    
    
    
    const emailHandler = (e)=>{
      const value = e.target.value;
      setEmail(value);
    }
    
    const passwordHandler = (e)=>{
      const value = e.target.value;
      setPassword(value);
    }
    
    const submitHandler = async (e)=>{
      e.preventDefault();
      
      const formData = {
        email,
        password
      }
      
      try{
        
        const response = await axios.post("http://localhost:8000/api/user/login",formData,{withCredentials: true,
      credentials: "include",});
        
        navigate("/");
        
      }
      
      catch(error){
        setUserError(error.response.data.message);
      }
      
    }
  return (
    <form className="flex flex-col  w-[95vw] ml-2 mt-36" method="POST" onSubmit={submitHandler}>
      
      <h1 className="text-[#fabb0a] flex gap-1 text-2xl justify-center mr-2.5">
        NoteApp
       <span className="text-black">
        Login
       </span>
      </h1>
      <input type="email" className=" border border-[#fabb0a] border-[1.5px] h-16 my-6 rounded-sm p-1" placeholder="Enter valid email" onChange={emailHandler}/>
      
      <input type="password" className=" border border-[#fabb0a] border-[1.5px] h-16 rounded-sm my-3 p-1" placeholder="Enter your password" onChange={passwordHandler}/>
      
      <p className="text-red-600 text-[13px]">{userError}</p>
      
      <button className=" border border-[#fabb0a] bg-[#fabb0a] h-14 rounded-sm my-2 flex gap-1.5 justify-center items-center text-[17px] text-white font-medium">Log In <LuLogIn className="font-medium"/>
      </button>
      
      <p>
        Don't have an account? 
        <Link to="/register" className="underline decoration-[#fabb0a] text-[#fabb0a]">
           Register
        </Link>
      </p>
      
    </form>
    
  )
}

export default Login