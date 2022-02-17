import DeleteBox from '@components/Popup/DeleteBox';

import { BiTrash } from '@react-icons/all-files/bi/BiTrash';

import { RootState } from '@redux/store';

import Avatar from '@shared/Avatar';
import SmallSpinner from '@shared/SmallSpinner';
import SuspenseWrapper from '@shared/SuspenseWrapper';

import { Suspense, lazy,useState } from 'react';

import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { IPost } from 'types/PostInterfaces';
import AddComment from './AddComment';
import Comment from './Comment';

import PostIcons from './PostIcons';
const Image = lazy(() => import("@shared/Image" /* webpackChunkName: "Image" */));


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

const handleCommentState = () => {
  setShowComments(!showComments);
}

const handlePopup = () => {
  setShowPopup(!showPopup);
}
  const navigate= useNavigate();
  return (
    <article
      key={_id}
      className="w-full min-h-[100px]   flex flex-col items-start justify-between my-[10px]  flex-wrap bg-white   rounded-sm border border-[#F5F7F9] shadow-box  "
    >
      <div className="w-full flex  mx-1 text-center  my-4 flex-row items-center justify-between flex-wrap">
        <div className="w-auto    flex text-center my-2 flex-row items-center  flex-wrap justify-center">
          <Avatar src={avatar} onClick={() => navigate(`/user/${user}`)} alt="User avatar" />

          <div className="flex flex-col items-start justify-center flex-wrap">
            <Link className="lg:text-xl md:text-md sm:text-sm font-bold break-all" to={user === currentUser._id ? `profile` : `user/${user}`}>{username}</Link>
            {createdAt && (
              <h1 className="text-sm">
                {new Date(createdAt).toLocaleString()}
              </h1>
            )}
          </div>
        </div>
        <div className="w-auto flex mx-1 items-center justify-center flex-row flex-wrap my-4">
          {user === currentUser._id ? <i onClick={handlePopup} className=" cursor-pointer p-1 "> <BiTrash color="#DC2626
" className="hover:text-slate-900" size="1.5em"  /></i> : ""}
        </div>
      </div>

      <div className="w-full flex-1 flex text-center  flex-wrap flex-col items-center justify-center">
        <div className="text-center break-all text-sm   my-1 mx-3 self-start font-normal">
          {text}
        </div>
        {image && (

          <Image
         
            src={ image}
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

      { <AddComment handleCommentState={handleCommentState} id={_id} />}
      {showComments && <Comment id={_id} />}
      { showPopup && <DeleteBox id={_id}/> }
    </article>
  );
}
export default Post;
