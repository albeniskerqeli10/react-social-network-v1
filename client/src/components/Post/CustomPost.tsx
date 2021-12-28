
import Avatar from "@shared/Avatar";
import { memo } from "react";
import { IPost } from "types/PostInterfaces";
import Comment from "./Comment";

interface ICustomPost {
  post: IPost;
}

function CustomPost({
  post

}: ICustomPost)  {

  const formatedDate= new Date(post.createdAt as Date).toLocaleDateString(); 

  return (
    <div className="w-[500px]  flex-wrap  shadow-lg shadow-slate-300/50 flex items-center justify-center mx-1 md:ml-10 flex-col bg-white">
    <div className="w-full py-2 flex items-start justify-start flex-wrap">
      <Avatar src={post.avatar } alt="user avatar" />

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold self-center text-lg">{post.username}</h1>
        <h4 className="self-center mx-1 text-gray-900 opacity-70 text-sm  ">{formatedDate}</h4>
      </div>
    </div>

    <h1 className="my-1 mx-2  py-1  text-lg break-all self-start font-normal">{post.text}</h1>

    <div className="w-full flex items-center justify-center  flex-col flex-wrap">
     {post.image &&  <img className="w-[600px] max-w-full h-[300px] object-cover hover:brightness-50 ease-in-out duration-200 object-center  " src={post.image} />}

    </div>
    <h1 className="mx-2 py-2 text-lg md:self-start self-center "><b>{post.likes?.length}</b> Likes</h1>
    {post.comments?.length === 0 ? (null) : <div className="w-full py-2  items-start justify-start">

      <Comment id={post._id} />
    </div>}


  </div>
  );
}
export default memo(CustomPost);
