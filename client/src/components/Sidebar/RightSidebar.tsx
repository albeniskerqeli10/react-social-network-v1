import { fetchFollowers } from "@api/UserApi";
import useAuth from "@hooks/useAuth";
import SuspenseWrapper from "@shared/SuspenseWrapper";
import { lazy, useMemo } from "react";
import { useQuery } from "react-query";
import { IUser } from "types/UserInterfaces";
interface RightSidebarProps {
  data: Array<IUser>;
  length: number;
}
const UserList = lazy(() => import("./UserList"));
const RightSidebar = () => {
  const singleUserKey = "SINGLE USER KEY";
  const currentUser = useAuth();
  const { data: userFollowers } = useQuery(
    [singleUserKey, currentUser._id],
    fetchFollowers,
    {
      onSuccess: (data: RightSidebarProps) => {
        // ...
      },
    }
  );
  const slicedFollowers = useMemo(() => {
    return userFollowers?.data?.slice(0, 10);
  }, [userFollowers]);

  return (
    <aside className="w-[250px] lg:sticky lg:top-[80px]  flex-1 lg:flex-none   flex flex-col gap-3 items-start justify-start  md:items-center   lg:min-h-[100vh] min-h-auto my-10 lg:my-1  mx-2 ">
      <div className="w-full shadow-box	rounded-xl py-2 bg-white  flex flex-col justify-start  flex-wrap items-center min-h-[300px]">
        <div className="w-full py-5 max-w-full lg:max-w-[70%]  flex flex-col flex-wrap items-center  justify-center gap-3 ">
          <h1 className="font-bold text-gray-900 text-center text-sm md:text-left   sm:text-sm md:text-md lg:text-lg ">
            Followers
          </h1>
        </div>
        <SuspenseWrapper>
          {userFollowers?.data?.length !== 0 &&
            slicedFollowers?.map((user: IUser) => (
              <div className="flex flex-row w-full  min-h-[50px] py-1 justify-center max-w-[70%]  items-center">
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
