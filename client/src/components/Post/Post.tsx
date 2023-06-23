import DeleteBox from "../../components/Popup/DeleteBox";
import { BiTrash } from "@react-icons/all-files/bi/BiTrash";
import { RootState } from "../../redux/store";
import Avatar from "../../shared/Avatar";
import { lazy, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../../types/PostInterfaces";
import AddComment from "./AddComment";
import PostIcons from "./PostIcons";

import SuspenseWrapper from "../../shared/SuspenseWrapper";
import Image from "../../shared/Image";
const Comment = lazy(() => import("./Comment"));

type PostProps = {
  post: IPost;
};

const Post = ({ post }: PostProps) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const formatedDate = useMemo(
    () => new Date(post.createdAt as any).toLocaleDateString(),
    [post.createdAt]
  );
  const handleCommentState = () => {
    setShowComments((prevCommentState) => !prevCommentState);
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const navigate = useNavigate();
  const navigateToUserPage = () => {
    navigate(currentUser._id === post.user ? "/profile" : `/user/${post.user}`);
  };

  return (
    <article
      key={post._id}
      className="w-full min-h-[50px]   flex flex-col items-start justify-between my-[10px]  flex-wrap bg-white   rounded-sm border border-neutral-200 shadow-box  "
    >

      <div className="w-full flex border-red-600  text-center  my-1 flex-row items-center justify-between flex-wrap">
        <div className="w-auto    flex text-center my-1 flex-row items-center  flex-wrap justify-center">
          <Avatar
            src={post.avatar}
            onClick={navigateToUserPage}
            alt="User avatar"
          />

          <div className="flex flex-col items-start justify-center flex-wrap">
            <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
              <Link
                className="lg:text-xl md:text-md sm:text-sm font-bold break-all"
                to={
                  post.user === currentUser._id
                    ? `profile`
                    : `/user/${post.user}`
                }
              >
                {post.username}
              </Link>
            </div>
            <h1 className="text-sm">{formatedDate}</h1>
          </div>
        </div>
        <div className="w-auto flex mx-1 items-center justify-center flex-row flex-wrap my-4">
          {post.user === currentUser._id && (
            <i onClick={handlePopup} className=" cursor-pointer p-1 ">
              {" "}
              <BiTrash
                color="#DC2626
"
                className="hover:text-slate-900"
                size="1.5em"
              />
            </i>
          )}
        </div>
      </div>

      <div className="w-full flex-1 flex text-center  flex-wrap flex-col items-center justify-center">
        <div className="text-center break-all text-sm    mx-3  self-start font-normal">
          <h1 className="pt-1 pb-2 my-1 text-lg font-bold"> {post.text}</h1>
        </div>
        {post.image && <Image src={post.image} alt="Image" />}
      </div>

      <PostIcons
        commentIconClick={() => setShowComments((comments) => !comments)}
        likes={post.likes}
        id={post._id}
      />

      {post.likes && (
        <div className="w-full mx-2 flex items-center justify-start">
          <h1 className="text-[16px] p-1 font-bold text-gray-900">
            {post?.likes?.length > 1 ? `${post.likes.length} likes` : `${post.likes.length} like`}
          </h1>
        </div>
      )}

      {<AddComment handleCommentState={handleCommentState} id={post._id} />}
      <SuspenseWrapper>

        {showComments && (
          <Comment id={post._id} />
        )}
      </SuspenseWrapper>

      {showPopup && <DeleteBox id={post._id} />}
    </article>
  );
};
export default Post;
