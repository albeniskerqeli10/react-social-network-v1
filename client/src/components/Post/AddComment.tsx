import { addComment } from "../../api/PostApi";
import useAuth from "../../hooks/useAuth";
import Avatar from "../../shared/Avatar";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CommentDataObj, IComment } from "../../types/CommentInterfaces";
import { queryClient } from "../../App";

export const singleCommentKey = "SINGLE COMMENT KEY";

interface AddCommentProps {
  id: string;
  handleCommentState: () => void;
}

const AddComment = ({ id, handleCommentState }: AddCommentProps) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const currentUser = useAuth();

  const commentMutation = useMutation(addComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([singleCommentKey]);
    },
    onError: (err) => { },
  });

  const handleComment = (data: IComment) => {
    const commentData: CommentDataObj = {
      id: id,
      content: data.content,
    };
    if (data.content === "") {
      alert("Type something to add a comment");
    } else {
      commentMutation.mutate(commentData);
      handleCommentState();
      reset();
    }
  };

  return (
    <div className="w-full   flex text-center my-4  flex-row gap-1 items-center justify-start">
      <Avatar
        src={currentUser.avatar}
        onClick={() => navigate(`/profile`)}
        alt="User avatar"
      />

      <form
        className="w-auto  flex-1 flex items-start justify-start"
        onSubmit={handleSubmit(handleComment as any)}
      >
        <input
          {...register("content")}
          className="w-full max-w-[96%] flex-1 mr-2  md:w-full py-2  bg-light-primary text-gray-900 placeholder-gray-900 border border-neutral-300  focus:shadow-outline rounded-md shadow-box "
          placeholder="   Write a comment"
        />
      </form>
    </div>
  );
};
export default AddComment;
