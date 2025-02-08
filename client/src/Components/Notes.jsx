import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav.jsx";
import { RiSearch2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
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
        navigate("/login");
      }
    };

    const getNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/note/getNotes", {
          withCredentials: true,
        });
        setNotes(res.data.data);
        setFilteredNotes(res.data.data); // Keep a separate copy for search filtering
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
    getNotes();
  }, [navigate]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/note/deleteNote/${id}`, {
        withCredentials: true,
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setFilteredNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleImportant = async (e, id) => {
    e.stopPropagation();
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? { ...note, important: !note.important } : note))
    );
    setFilteredNotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? { ...note, important: !note.important } : note))
    );

    try {
      await axios.get(`http://localhost:8000/api/note/setImportant/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const noteClicked = (id) => {
    navigate(`/updatenote/${id}`);
  };

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredNotes(notes); // Reset if search is cleared
    } else {
      const updatedNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(value)
      );
      setFilteredNotes(updatedNotes);
    }
  };

  return (
    <>
      <Nav noteColor="#fabb0a" noteBorder="2px" />
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
            className="bg-white mt-3.5 ml-3.5 w-[92%] border rounded-md p-4"
            onClick={() => noteClicked(note._id)}
          >
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-gray-500">{note.paragraph}</p>
            <span className="text-gray-500 text-[12px]">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>

            <div className="flex justify-end items-center gap-3 mt-2">
              {note.important ? (
                <FaBookmark
                  className="text-yellow-500 text-[16px]"
                  onClick={(e) => toggleImportant(e, note._id)}
                />
              ) : (
                <FaRegBookmark
                  className="text-gray-500 text-[16px]"
                  onClick={(e) => toggleImportant(e, note._id)}
                />
              )}
              <MdDelete
                className="text-red-500 text-[19px]"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note._id);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-3.5">No notes</p>
      )}

      <button className="border rounded-full bg-yellow-500 w-14 h-14 flex justify-center items-center text-white text-[30px] left-[75%] top-[80%] fixed font-bold border-0">
        <Link to="/create">
          <IoAddOutline />
        </Link>
      </button>
    </>
  );
};

export default Notes;
