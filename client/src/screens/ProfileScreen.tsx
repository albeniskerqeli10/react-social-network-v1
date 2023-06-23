import EditProfile from "../components/Form/EditProfile";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import Button from "../shared/Button";
import { useState, lazy } from "react";
import { IPost } from "../types/PostInterfaces";
import { Outlet } from "react-router-dom";
import SuspenseWrapper from "../shared/SuspenseWrapper";
const CustomPost = lazy(() => import("../components/Post/CustomPost" /* webpackChunkName: "CustomPost" */));

const ProfileScreen = () => {
  const [editProfile, setEditProfile] = useState(false);
  const currentUser = useAuth();

  const id: string = currentUser?._id;

  const { data: user, error } = useSingleUser(id);

  return (
    user ? (<section className="w-full min-h-[80vh]  items-center flex-wrap flex-col justify-center">
      <div className="lg:max-w-4xl max-w-full mx-auto flex items-center justify-center flex-col">
        <div className="flex my-3 py-2   w-full flex-row flex-wrap items-center justify-center gap-3 min-h-[50px] text-slate-900">
          <div className="self-center">
            <img
              decoding="async"
              className="mx-2 my-1 object-center object-cover  p-2 w-32 h-32 rounded-full"
              alt="profile"
              src={user.avatar as string}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 ">
            <div className="flex items-center w-full flex-wrap md:justify-start justify-center  gap-3">
              <h1 className="font-bold text-lg">{user.username}</h1>
              <Button
                margin="1"
                size="xs"
                bgColor="bg-deepBlue"
                textColor="white"
                title="Edit Profile"
                onClick={() => setEditProfile(!editProfile)}
              >
                Edit Profile
              </Button>
            </div>

            <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
              <h1 className="text-black">
                <b className="text-slate-900"> {user.followers.length}</b>{" "}
                Followers
              </h1>
              <h1>
                <b className="text-slate-900"> {user.following.length}</b>{" "}
                Following
              </h1>
              <h1>
                <b className="text-slate-900"> {user.posts.length}</b> Posts
              </h1>
            </div>
            <div className="flex md:self-start self-center">
              <p className="font-normal text-sm text-black opacity-80">
                Profile Bio 🚀
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <h1 className="text-2xl py-2 text-slate-900 font-bold">
            {user.posts.length !== 0 ? `Your Posts` : "No Posts"}
          </h1>
          <div className="w-full my-5  flex-wrap gap-5 flex flex-row items-center justify-center">
            <div className="w-full   flex items-center justify-center  max-w-full flex-row flex-wrap gap-3 ">
              <SuspenseWrapper>
                {user.posts.map((post: IPost) => (
                  <CustomPost post={post} />
                ))}</SuspenseWrapper>
              {editProfile && <EditProfile />}
            </div>
          </div>
        </div>
      </div>
    </section>
    ) : error ? <h1>Something went wrong</h1> : <Outlet />)
};

export default ProfileScreen;
