import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav.jsx";
import { RiSearch2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const ImpNotes = () => {
  const navigate = useNavigate();
  const [importantNotes, setImportantNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

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

    const getImportantNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/note/getImportant", {
          withCredentials: true,
        });
        setImportantNotes(res.data.data);
        setFilteredNotes(res.data.data); // Keep a copy for search functionality
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
    getImportantNotes();
  }, [navigate]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/note/deleteNote/${id}`, {
        withCredentials: true,
      });
      setImportantNotes((prev) => prev.filter((note) => note._id !== id));
      setFilteredNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleImportant = async (e, id) => {
    e.stopPropagation();

    setImportantNotes((prev) =>
      prev.filter((note) => note._id !== id)
    );

    setFilteredNotes((prev) =>
      prev.filter((note) => note._id !== id)
    );

    try {
      await axios.get(`http://localhost:8000/api/note/setImportant/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredNotes(importantNotes); // Reset search
    } else {
      const updatedNotes = importantNotes.filter((note) =>
        note.title.toLowerCase().includes(value)
      );
      setFilteredNotes(updatedNotes);
    }
  };

  return (
    <>
      <Nav savedColor="#fabb0a" savedBorder="2px" />

      <div className="flex mt-3.5 justify-center items-center">
        <RiSearch2Line className="text-[20px] relative left-10 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title"
          className="bg-gray-50 h-11 w-11/12 border rounded-full pl-12 mr-6 border-0"
          onChange={searchHandler}
        />
      </div>

      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-white mt-3.5 ml-3.5 w-[92%] border rounded-md border-0 pl-4 pt-4"
          >
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-gray-500">{note.paragraph}</p>
            <span className="text-gray-500 text-[12px]">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>

            <div className="flex justify-end items-center gap-3 pb-3 mr-2">
              <FaBookmark
                className="text-yellow-500 text-[16px]"
                onClick={(e) => toggleImportant(e, note._id)}
              />
              <MdDelete
                className="text-red-500 text-[19px]"
                onClick={() => deleteNote(note._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-3.5">No important notes</p>
      )}
    </>
  );
};

export default ImpNotes;
