import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/logout", {
          withCredentials: true,
        });
        
        navigate("/login");
      } catch (error) {
        navigate("/");
      }
    };
    
    logout(); // Call the async function inside the useEffect
  }, [navigate]); // Include navigate as a dependency
  
  return null; // Since this is a redirecting component, it doesn't need to render anything
};

export default Logout;
