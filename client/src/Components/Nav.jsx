import { GrNotes } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { RiSettingsLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = ({ noteColor, savedColor, settingColor, noteBorder, savedBorder, settingBorder }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex justify-around my-5 text-[22px] text-gray-500 items-center">
      <Link to="/" className={`text-[${noteColor}] border-b-[${noteBorder}] border-yellow-500 pb-2`}>
        <GrNotes />
      </Link>

      <Link to="/important" className={`text-[${savedColor}] border-b-[${savedBorder}] border-yellow-500 pb-2`}>
        <FaRegBookmark />
      </Link>

      <button
        className={`text-[${settingColor}] border-b-[${settingBorder}] border-yellow-500 pb-2 text-[25px]`}
        onClick={() => {
          setClicked(true);
        }}
      >
        <RiSettingsLine />
      </button>

      {clicked ? (
        <div
          className={`fixed right-0 top-0 h-[100%] w-[50%] bg-white z-10 pt-1 
          transition-transform duration-500 ease-in-out transform translate-x-0`}
        >
          <div className="flex w-full justify-around">
            <p className="text-yellow-500">NoteApp</p>
            <button className="" onClick={() => setClicked(false)}>
              <CiCircleRemove className="text-[30px]" />
            </button>
          </div>

          <div className="mt-5 flex flex-col justify-center gap-2 items-center">
            <Link to="/profile" className="flex gap-1.5 items-center">
              <CgProfile />
              <span className="text-[13px]">Edit Profile</span>
            </Link>

            <Link to="/logout" className="flex gap-1.5 items-center">
              <MdOutlineLogout />
              <span className="text-[13px]">Logout</span>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={`fixed right-0 top-0 h-[100%] w-[50%] bg-white z-10 flex justify-around items-start pt-1 
          transition-transform duration-500 ease-in-out transform translate-x-full`}
        ></div>
      )}
    </div>
  );
};

export default Nav;
