
import { deletePost } from "@api/PostApi";
import DeleteBox from "@components/Popup/DeleteBox";
import { BiTrash } from '@react-icons/all-files/bi/BiTrash';
import { RootState } from "@redux/store";
import Avatar from "@shared/Avatar";
import { memo, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IPost } from "types/PostInterfaces";
import { queryClient } from "../../App";
import AddComment from "./AddComment";
import Comment from "./Comment";
import PostIcons from "./PostIcons";
function Post({
  _id,
  avatar,
  username,
  text,
  createdAt,
  image,
  user,
  likes,

  comments,
}: IPost)  {
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const [showComments, setShowComments] = useState<boolean>(false);
const [showPopup , setShowPopup] = useState<boolean>(false);

  const navigate= useNavigate();
  return (
    <article
      key={_id}
      className="w-full min-h-[100px]   flex flex-col items-start justify-between my-[10px]  flex-wrap bg-white   rounded-sm border border-[#F5F7F9] shadow-box  "
    >
      <div className="w-full flex  mx-1 text-center  my-4 flex-row items-center justify-between flex-wrap">
        <div className="w-auto   flex text-center my-2 flex-row items-center  flex-wrap justify-center">
          <Avatar src={avatar} onClick={() => navigate(`/user/${user}`)} alt="User avatar" />

          <div className="flex flex-col items-start justify-center flex-wrap">
            <Link className="text-xl font-bold" to={user === currentUser._id ? `profile` : `user/${user}`}>{username}</Link>
            {createdAt && (
              <h1 className="text-sm">
                {new Date(createdAt).toLocaleString()}
              </h1>
            )}
          </div>
        </div>
        <div className="w-auto flex mx-1 items-center justify-center flex-row flex-wrap my-4">
          {user === currentUser._id ? <i onClick={() => setShowPopup(!showPopup)} className=" cursor-pointer p-1 "> <BiTrash color="#DC2626
" className="hover:text-slate-900" size="1.5em"  /></i> : ""}
        </div>
      </div>

      <div className="w-full flex-1 flex text-center  flex-wrap flex-col items-center justify-center">
        <div className="text-left break-all text-sm   my-1 mx-3 self-start font-normal">
          {text}
        </div>
        {image && (
          <img
            loading="lazy"
            className="object-cover  my-3 max-w-full  max-h-auto	drop-shadow-md w-[100%]	  rounded-sm "
            src={image}
            alt="Avatar"
          />
        )}
      </div>

        <PostIcons  commentIconClick={() => setShowComments(!showComments)} likes={likes} id={_id} />

      {likes && (
        <div className="w-full mx-2 flex items-center justify-start">
          <h1 className="text-lg p-1 font-bold text-gray-900">
            {likes?.length} likes
          </h1>
        </div>
      )}

      { <AddComment commentStateChange={() => setShowComments(true)} id={_id} />}
      {showComments && <Comment id={_id} />}
      { showPopup && <DeleteBox id={_id}/> }
    </article>
  );
}
export default memo(Post);
