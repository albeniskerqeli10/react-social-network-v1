import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import { Link } from "react-router-dom";
function LeftSidebar() {
  return (
    <aside className=" md:w-[280px] lg:sticky  lg:top-[80px] flex-1 lg:flex-initial  flex flex-col items-start justify-start   md:items-center mt-5 md:mt-20  lg:min-h-[80vh] min-h-auto my-10 lg:my-1  mx-2">
      <div className="w-full shadow-box	rounded-md py-1 bg-white  flex flex-column justify-center  flex-wrap items-center min-h-[200px] border border-neutral-200">
        <ul className="w-full  max-w-[80%]   flex flex-col justify-start items-start flex-wrap gap-3">
          <li className="p-2 font-bold  flex  gap-5 flex-row items-center justify-center">
            <AiFillHome size="1.5em" color="#121212" />
            <a href="/">Home</a>
          </li>

          <li className="p-2 flex gap-5  break-all flex-row items-center justify-center">
            <AiOutlineUser size="1.5em" />
            <Link to="/profile">Profile</Link>
          </li>

          <li className="p-2   flex  break-all gap-5 flex-row items-center justify-center">
            <BiMessageSquareDetail size="1.5em" />
            <Link to="/messages">Messages</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
