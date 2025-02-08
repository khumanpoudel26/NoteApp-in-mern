import { MdFileDownloadDone } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateNote = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/isAuthenticated", {
          withCredentials: true,
        });

        if (!res.data.success) {
          navigate("/login");
        }
      } catch (err) {
        console.log("User not authenticated", err);
        navigate("/login");
      }
    };

    const getNote = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/note/getNote/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const { title, paragraph } = res.data.data;
          setTitle(title);
          setParagraph(paragraph);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    checkAuth();
    getNote();
  }, [navigate, id]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const pghHandler = (e) => {
    setParagraph(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const note = await axios.patch(
        `http://localhost:8000/api/note/updateNote/${id}`,
        { title, paragraph },
        { withCredentials: true }
      );

      if (note.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="h-[100vh] w-full bg-white">
      <form className="py-2.5 px-5 flex flex-col" onSubmit={submitHandler}>
        <input
          type="text"
          className="h-14 pl-1.5 border border-2 border-yellow-400"
          placeholder="Title"
          value={title}
          onChange={titleHandler}
        />

        <textarea
          type="text"
          className="h-[70vh] my-10 border border-2 border-yellow-400 pl-1.5"
          placeholder="Start Paragraph"
          value={paragraph} // Add value to bind to state
          onChange={pghHandler}
        />

        <button
          type="submit"
          className="absolute border rounded-full w-14 h-14 text-white bg-yellow-500 text-2xl top-[85%] left-[80%] flex items-center justify-center"
        >
          <MdFileDownloadDone />
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
