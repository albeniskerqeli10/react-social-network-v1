
import DeleteBox from "../../components/Popup/DeleteBox";
import useAuth from "../../hooks/useAuth";
import { BiTrash } from '@react-icons/all-files/bi/BiTrash';
import Avatar from "../../shared/Avatar";
import { memo,useState} from 'react';
import { IPost } from "../../types/PostInterfaces";
import AddComment from "./AddComment";
import Comment from './Comment';
import PostIcons from "./PostIcons";

interface ICustomPost {
  post: IPost;
}

function CustomPost({
  post

}: ICustomPost)  {
  const [showComments, setShowComments] = useState<boolean>(false);
const [showPopup , setShowPopup] = useState<boolean>(false);
  const formatedDate= new Date(post.createdAt as Date).toLocaleDateString(); 
  const currentUser = useAuth();

  return (
    <div key={post._id} className="w-[500px]  flex-wrap  shadow-lg shadow-slate-300/50 flex items-center justify-center mx-1 md:ml-10 flex-col bg-white">
    <div className="w-full py-2 flex items-center justify-between flex-wrap ">
      <div className="flex flex-row items-center justify-center">
      <Avatar src={post.avatar } alt="user avatar" />
<div className="flex flex-col items-center justify-center flex-wrap">
        <h1 className="font-bold self-center text-lg">{post.username}</h1>
        <h4 className="self-center mx-1 text-gray-900 opacity-70 text-sm  ">{formatedDate}</h4>
        </div>
      </div> 
      <div className="w-auto flex mx-1 items-center justify-center flex-row flex-wrap my-4">
          {post.user === currentUser._id ? <i onClick={() => setShowPopup(true)} className=" cursor-pointer p-1 "> <BiTrash color="#DC2626
" className="hover:text-slate-900" size="1.5em"  /></i> : ""}
        </div>
    </div>
   


    <h1 className="my-1 mx-2  py-1  text-lg break-all self-start font-normal">{post.text}</h1>

    <div className="w-full flex items-center justify-center  flex-col flex-wrap">
     {post.image &&  <img  decoding="async" alt="Random pic" className="w-[600px] max-w-full h-[300px] object-cover hover:brightness-50 ease-in-out duration-200 object-center  " src={post.image} />}

    </div>
    { <div className="w-full py-2  items-start justify-start">
<PostIcons id={post._id} likes={post.likes} commentIconClick={() => setShowComments(true)}/>
{post.likes && (
        <div className="w-full my-4 flex items-start justify-start">
          <h1 className="text-lg mx-2 font-bold text-gray-900">
            {post.likes?.length} likes
          </h1>
        </div>
      )}
      {showComments && <Comment id={post._id} />}

{<AddComment handleCommentState={() => setShowComments(true)} id={post._id} />}
      { showPopup && <DeleteBox id={post._id}/> }
    </div>}


  </div>
  );
}
export default memo(CustomPost);
