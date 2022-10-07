import Search from "../../components/Search/Search";
import useAuth from "../../hooks/useAuth";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import { logoutUser } from "../../redux/slices/userSlice";
import Avatar from "../../shared/Avatar";
//@ts-ignore
import { startTransition, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledNavbar = styled.header`
  width: 100%;
  min-height: 40px;
 position:sticky;
  top:0;
  left:0;
  z-index: 100;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content:center;
  // border-bottom: 1px solid #e6ecf0;
  // box-shadow: /0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow:0 3px 20px rgb(0 0 0 / 4%);

`
{/* container md:mx-auto flex flex-row items-center lg:justify-between justify-center   flex-wrap  px-3  gap-5 */ }


const StyledNavbarContainer = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  flex-direction:wrap;
  align-items:center;
  gap:1.25rem;
  padding: 0 0.75rem;

@media (min-width: 640px) {
    max-width: 640px;
  
}

@media (min-width: 768px) {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  
}

@media (min-width: 1024px) {
    max-width: 1024px;
        justify-content: space-between;

  
}

@media (min-width: 1280px) {
    max-width: 1280px;
  
}

@media (min-width: 1536px) {
    max-width: 1536px;
  
}
 
 
`



const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useAuth();

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  function handleLogout() {
    dispatch(logoutUser());
    startTransition(() => {
      setToggleDropdown(!toggleDropdown);
    });
  }

  function toggleDropdownHandler() {
    setToggleDropdown(!toggleDropdown);
  }




  return (
    <StyledNavbar>

      {/* <div className=" container md:mx-auto flex flex-row items-center lg:justify-between justify-center   flex-wrap  px-3  gap-5 "> */}
      <StyledNavbarContainer>
        <div className="md:w-80 w-auto py-4 flex flex-row items-center justify-center flex-nowrap ">

          <Link to="/" className="mx-2 text-lg text-deepBlue hover:text-slate-900 font-bold "
          >
            Social Network

          </Link>

        </div>
        {currentUser && (
          <div className="w-auto  gap-2  mx-2 sm:flex hidden items-center border rounded-lg  justify-center bg-light-primary flex-nowrap border-1 border-slate-50 flex-row shadow-box min-h-[40px] ">
            <i className="mx-2 flex items-center justify-center">
              <AiOutlineSearch className="text-primary font-bold" />
            </i>
            <Search />
          </div>
        )}
        <div className="md:w-80 w-auto  flex flex-row items-center gap-3 justify-center text-md sm:flex-wrap flex-nowrap px-3 my-2">
          <>
            {currentUser === null ? (
              <>
                <Link
                  className="bg-deepBlue m-2 py-2 px-3 text-white font-inter hover:bg-gray-900 focus:ring-deepBlue text-sm focus:ring-opacity-50"
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
                  <Avatar
                    onClick={toggleDropdownHandler}
                    alt="User Avatar"
                    src={currentUser.avatar}
                  />
                  {/* <a className="cursor-pointer" onClick={toggleDropdownHandler}>User</a> */}
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
      </StyledNavbarContainer>
    </StyledNavbar>
  );
};

export default Navbar;
