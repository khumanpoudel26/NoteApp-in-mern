import { MdFileDownloadDone } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
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

    checkAuth(); // Calling the function
  }, [navigate]); // Adding dependency array

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const pghHandler = (e) => {
    setParagraph(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const note = await axios.post(
        "http://localhost:8000/api/note/createNote",
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
          onChange={titleHandler}
        />

        <textarea
          type="text"
          className="h-[70vh] my-10 border border-2 border-yellow-400 pl-1.5"
          placeholder="Start Paragraph"
          onChange={pghHandler}
        />

        <button type="submit" className="absolute border rounded-full w-14 h-14 text-white bg-yellow-500 text-2xl top-[85%] left-[80%] flex items-center justify-center">
          <MdFileDownloadDone />
        </button>
      </form>
    </div>
  );
};

export default Create;
