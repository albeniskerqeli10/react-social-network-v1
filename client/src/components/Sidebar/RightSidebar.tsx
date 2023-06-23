import { fetchFollowers } from "../../api/UserApi";
import useAuth from "../../hooks/useAuth";
import SuspenseWrapper from "../../shared/SuspenseWrapper";
// @ts-ignore
import { lazy, useTransition, useState, startTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../types/UserInterfaces";
import SmallSpinner from "../../shared/SmallSpinner";
interface RightSidebarProps {
  data: Array<IUser>;
  length: number;
}
const UserList = lazy(() => import("./UserList"));
const RightSidebar = () => {
  const [followers, setFollowers] = useState<any>([]);
  const singleUserKey = "SINGLE USER KEY";
  const currentUser = useAuth();
  useQuery(
    [singleUserKey, currentUser._id],
    fetchFollowers,
    {
      refetchOnWindowFocus: false,

      onSuccess: (data: RightSidebarProps) => {
        startTransition(() => {
          setFollowers(data.data);
        });
      },
    }
  );


  return (
    <aside className="w-[250px]  lg:sticky lg:top-[80px]  flex-1 lg:flex-none   flex flex-col gap-3 items-start justify-start   md:items-center   lg:min-h-[80vh] min-h-auto my-10 lg:my-1  mx-2 ">
      <div id="customAsideContent" className="w-full shadow-box	rounded-md py-2 bg-white  flex flex-row justify-start  flex-wrap border border-neutral-200 items-center max-h-[500px] overflow-y-hidden">
        <div className="w-full py-5 max-w-full lg:max-w-[70%]  flex flex-col flex-wrap items-center  justify-center gap-3 ">
          <h1 className="font-bold text-gray-900 text-center text-sm md:text-left   sm:text-sm md:text-md lg:text-lg ">
            Followers
          </h1>
        </div>
        <SuspenseWrapper>
          {followers?.map((user: IUser) => (
            <div
              key={user._id}
              className="flex flex-row w-full  min-h-[50px] py-1 justify-center max-w-[70%]  items-center"
            >
              <div className="w-full  flex flex-row items-center 	justify-center flex-wrap ">
                <UserList key={user._id} user={user} />
              </div>
            </div>
          ))}
        </SuspenseWrapper>
      </div>
    </aside>
  );
};

export default RightSidebar;
