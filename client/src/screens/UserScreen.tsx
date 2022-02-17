import { followUser, unfollowUser } from "@api/UserApi";
import CustomPost from "@components/Post/CustomPost";
import useSingleUser, { singleUserKey } from "@hooks/useSingleUser";
import Button from "@shared/Button";
import Loader from "@shared/Loader";
import React from "react";
import { useQuery } from "react-query";
import useAuth from "@hooks/useAuth";
import { useParams } from "react-router-dom";
import { IPost } from "types/PostInterfaces";
import { queryClient } from "../App";
const UserScreen = () => {
  const currentUser = useAuth();
  const { id } = useParams() as { 
    id: string;
  }
  const followKey = "FOLLOW KEY";
  const unfollowKey = "UNFOLLOW KEY";
  const { data: user } = useSingleUser({
    id,
    
  });
  const { refetch: followRefetch } = useQuery([followKey, id], followUser, {
    enabled: false,

    onSuccess: () => {
      queryClient.invalidateQueries(singleUserKey);
    },
  });

  const { refetch: unfollowRefetch } = useQuery(
    [unfollowKey, id],
    unfollowUser,
    {
      enabled: false,

      onSuccess: () => {
        queryClient.invalidateQueries(singleUserKey);
      },
    }
  );
  

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    followRefetch();
  };

  const handleUnfollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    unfollowRefetch();
  };

  return (
    user ? (
      <section className="w-full mt-20 min-h-[100vh] bg-slate-50 items-center flex-wrap flex-col justify-center">
        <div className="lg:max-w-4xl max-w-full mx-auto flex items-center justify-center flex-col">
          <div className="flex my-3 py-2   w-full flex-row flex-wrap items-center justify-center gap-3 min-h-[50px] text-slate-900">
            <div className="self-center">
              <img
                className="mx-2 my-1 p-2 w-32 h-32 rounded-full object-center object-cover"
                src={user.avatar as string} alt="user avatar"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 ">
              <div className="flex items-center w-full flex-wrap md:justify-start justify-center  gap-3">
                <h1 className="font-bold text-lg">{user.username}</h1>
                {user._id === currentUser._id ? null : user?.followers.find(
                    (follow: string) => follow === currentUser._id
                  ) ? (

                    
                  <Button
                    bgColor="primary"
                    margin="1"
                    size="xs"
                    textColor="white"
                    onClick={handleUnfollow}
                    title="Unfollow"
                  />
                ) : user?.following?.find(
                    (follow: string) => follow === currentUser._id
                  ) ? (
                  <Button
                    bgColor="primary"
                    margin="1"
                    size="xs"
                    textColor="white"
                    onClick={handleFollow}
                    title="Follow Back"
                  />
                ) : (
                  <Button
                    bgColor="primary"
                    margin="1"
                    size="xs"
                    textColor="white"
                    onClick={handleFollow}
                    title="Follow"
                  />
                )}
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
            {user.posts.length !== 0 ? `${user.username} Posts` : "No Posts"}
            </h1>
            <div className="w-full my-5  flex-wrap gap-5 flex flex-row items-center justify-center">
              <div className="w-full   flex items-center justify-center  max-w-full flex-row flex-wrap gap-3 ">
                {user.posts.map((post: IPost) => (
                  <CustomPost
                   post={post}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    ):<Loader/>
  );
};

export default UserScreen;
