import { Link, useNavigate } from 'react-router-dom';
import { BsSignIntersection } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState("");

  // Check if the user already has a valid token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/isAuthenticated", { 
          withCredentials: true 
        });
        if (res.data.success) {

          navigate("/"); // or whatever route is for notes
        }
      } catch (err) {
        console.log("User not authenticated", err);
      }
    };

    checkAuth();
  }, [navigate]);

  const nameError = name.length < 4;
  const passwordError = password.length <= 4;
  const confirmPasswordError = confirm !== password && password.length > 4;
  const emailError = email.length === 0;

  const isFormValid = !nameError && !passwordError && !confirmPasswordError && !emailError;

  const nameHandler = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const passwordHandler = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const confirmHandler = (e) => {
    const confirm = e.target.value;
    setConfirm(confirm);
  };
  const emailHandler = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = { name, email, password };
      const response = await axios.post("http://localhost:8000/api/user/register", formData, { 
        withCredentials: true, credentials: "include" 
      });
      console.log(response);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setUserError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form className="flex flex-col w-[95vw] ml-2 mt-16 " onSubmit={formHandler} method="POST">
      <h1 className="text-[#fabb0a] flex gap-1 text-2xl justify-center mr-2.5">
        NoteApp
        <span className="text-black">Register</span>
      </h1>

      <input
        type="text"
        className="border border-[#fabb0a] border-[1.5px] h-16 my-4 rounded-sm p-1"
        placeholder="Enter your full name"
        onChange={nameHandler}
      />
      
      {nameError && <p className="text-red-600 text-[13px]">*Name should be at least 4 characters long</p>}
      
      <input
        type="email"
        className="border border-[#fabb0a] border-[1.5px] h-16 rounded-sm p-1 my-5"
        placeholder="Enter valid email"
        onChange={emailHandler}
        required
      />
      {emailError && <p className="text-red-600 text-[13px]">*Email shouldn't be empty</p>}
      <p className="text-red-600 text-[13px]">{userError}</p>
      <input
        type="password"
        className="border border-[#fabb0a] border-[1.5px] h-16 rounded-sm my-5 p-1"
        placeholder="Enter your password"
        onChange={passwordHandler}
      />
      {passwordError && <p className="text-red-600 text-[13px]">*password should be at least 6 characters long</p>}
      

      <input
        type="password"
        className="border border-[#fabb0a] border-[1.5px] h-16 rounded-sm my-5 p-1"
        placeholder="Confirm the password"
        onChange={confirmHandler}
      />
      
      {confirmPasswordError && <p className="text-red-600 text-[13px]">*Password doesn't match</p>}
      
      <button
        className="border border-[#fabb0a] bg-[#fabb0a] h-14 rounded-sm my-1 flex gap-1.5 justify-center items-center text-[17px] text-white font-medium disabled:opacity-60"
        disabled={!isFormValid}
      >
        Register <BsSignIntersection className="font-medium" />
      </button>

      <p>
        Already have an account?
        <Link to="/login" className="underline decoration-[#fabb0a] text-[#fabb0a]">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
