import { BiTrash } from '@react-icons/all-files/bi/BiTrash';
import { useMutation, useQuery } from "react-query";
import { deleteComment, fetchComments } from "@api/PostApi";
import { queryClient } from "../../App";
import Avatar from "@shared/Avatar";
import { IComment } from "types/CommentInterfaces";
import { singleCommentKey } from './AddComment';
import useAuth from '@hooks/useAuth';
;
;
function Comment({id}: {id:string  }){
  const { data:comments } = useQuery([singleCommentKey, id],  fetchComments, {
    onSuccess: (comments: IComment[]) => {
    },
  });
  const currentUser = useAuth();

 const deleteCommentMutation =  useMutation(deleteComment  ,  {
  onSuccess:() => {
    queryClient.invalidateQueries(singleCommentKey);

  }

 });
  return ( 
 
    <div className="w-full flex flex-row items-center justify-center flex-wrap">
     {comments 
      && comments.slice(0,5).map((comment:IComment) => (
            <div key={comment._id} className="w-full py-1 flex items-center justify-start flex-row gap-2 rounded-lg flex-wrap  ">
              <Avatar src={comment.avatar} alt="user avatar"/>
              <h4 className="font-bold">{comment.username}</h4>
              <h4>{comment.content}</h4>
              {comment.user === currentUser._id ? 
              <i  className="p-1 cursor-pointer "> <BiTrash onClick={() => deleteCommentMutation.mutate(comment._id)} color="#DC2626
" className="hover:text-red-400" size="1.2em" /></i> : ""}
             </div>
           ))
      
    }
    
  </div>
    )}

export default Comment;
