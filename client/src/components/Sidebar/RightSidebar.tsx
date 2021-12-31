import { fetchFollowers } from "@api/UserApi";
import { RootState } from "@redux/store";
import Avatar from "@shared/Avatar";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "types/UserInterfaces";
 interface RightSidebarProps {
   data:Array<IUser>;
   length:number;
 }const RightSidebar = () => {
  const singleUserKey = "SINGLE USER KEY";
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { data:userFollowers} = useQuery(
    [singleUserKey, currentUser._id],
    fetchFollowers ,
    {
      onSuccess: (data:RightSidebarProps) => {
        // ...
      },

      suspense: true,
    }
  );

  return (
    <aside className="w-[280px] md:sticky md:top-0  flex-1 lg:flex-none   flex flex-col gap-3 items-start justify-start  md:justify-center md:items-center   lg:min-h-[100vh] min-h-auto my-10 lg:my-1  mx-2 ">
      <div className="w-full shadow-box	rounded-xl py-2 bg-white  flex flex-col justify-start  flex-wrap items-center min-h-[300px]">
        <div className="w-full py-5 max-w-full lg:max-w-[70%]  flex flex-col flex-wrap items-center  justify-center gap-3 ">
          <h1 className="font-bold text-gray-900 text-center text-sm md:text-left   sm:text-sm md:text-md lg:text-lg ">Followers/Friends</h1>
        </div>
        {
          userFollowers?.data?.length !== 0  ? userFollowers?.data?.slice(0,5).map((user: IUser) => (
            <div className="flex flex-row w-full  min-h-[50px] py-1 justify-center max-w-[70%]  items-center">
              <div className="w-full  flex flex-row items-center 	justify-center flex-wrap ">
                <div className="w-full flex flex-1 items-center justify-start flex-wrap gap-3">
                  <Avatar alt="User avatar" src={user.avatar} radius="sm" />
                  <Link
                    to={user._id === currentUser._id ? `profile` : `user/${user._id}`}
                    className="text-gray-900  text-left "
                  >
                    {user.username}
                  </Link>
                </div>
              </div>
            </div>
          )):<div className="w-full min-h-[100px] py-5 flex items-center justify-center">
            <h1 className="font-bold text-slate-800 ">No Followers</h1>
            </div>}
      </div>

    </aside>
  );
};

export default RightSidebar;
