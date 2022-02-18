import Search from "@components/Search/Search";
import useAuth from "@hooks/useAuth";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import { logoutUser } from "@redux/slices/userSlice";
import Avatar from "@shared/Avatar";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useAuth();

  const [toggleDropdown, setToggleDropdown] = React.useState<boolean>(false);
  function handleLogout() {
    dispatch(logoutUser());
    setToggleDropdown(!toggleDropdown);
  }

  function toggleDropdownHandler() {
    setToggleDropdown(!toggleDropdown);
  }
  return (
    <header className="w-full  lg:fixed  top-0 z-40 shadow-box min-h-[70px]   bg-white flex flex-row flex-nowrap items-center justify-center ">
      <div className=" container md:mx-auto flex flex-row items-center lg:justify-between justify-center   md:flex-nowrap flex-wrap gap-5 ">
        <div className="w-80 py-4 flex flex-row items-center justify-center flex-wrap ">
          <Link
            to="/"
            className="mx-2 text-lg text-deepBlue hover:text-slate-900 font-bold "
          >
            Social Network
          </Link>
        </div>
        {currentUser && (
          <div className="w-auto  gap-2  mx-2 flex items-center border rounded-lg  justify-center bg-light-primary flex-nowrap border-1 border-slate-50 flex-row shadow-box min-h-[40px] ">
            <i className="mx-2 flex items-center justify-center">
              <AiOutlineSearch className="text-primary font-bold" />
            </i>
            <Search />
          </div>
        )}
        <div className="w-80 flex flex-row items-center gap-3 justify-center text-md flex-wrap my-2">
          <>
            {currentUser === null ? (
              <>
                <Link
                  className="bg-deepBlue m-2 py-2 px-3 text-white font-inter hover:bg-gray-900 focus:ring-deepBlue focus:ring-opacity-50"
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className="bg-gray-900 border-2 border-gray-900 m-2 py-[6px] text-md  px-3 text-white font-inter hover:bg-gray-800 hover:border-gray-900 hover:text-white focus:ring-purple-600 focus:ring-opacity-50"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <li className="list-none p-2 bg-light-primary rounded-full shadow-box    mx-1 ">
                  <Link to="/messages">
                    <BiMessageSquareDetail size="1.5em " color="#232324" />
                  </Link>
                </li>

                <div className="relative inline-block text-left">
                  <div>
                    <Avatar
                      onClick={toggleDropdownHandler}
                      alt="User Avatar"
                      src={currentUser.avatar}
                    />
                  </div>
                  {toggleDropdown && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-box flex items-center justify-start flex-wrap mx-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      <div className="py-2 flex flex-col" role="none">
                        <Link
                          className="text-gray-700 block px-4 py-2 text-sm"
                          onClick={toggleDropdownHandler}
                          to="/profile"
                        >
                          Profile
                        </Link>

                        <Link
                          className="text-gray-700 block px-4 py-2 text-sm"
                          onClick={handleLogout}
                          to="/"
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
