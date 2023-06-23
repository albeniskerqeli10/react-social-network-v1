import { deletePost } from "../../api/PostApi";
import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

type DeleteBoxProps = {
  id: string;
};
const DeleteBox = ({ id }: DeleteBoxProps) => {
  const [open, setOpen] = useState(true);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const deleteMutation = useMutation(deletePost);

  const handleDelete = () => {
    ; deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        handleCloseModal();
      },
    });
  };
  return (
    <Modal open={open} onClose={handleCloseModal}>
      <div className="w-full flex-col text-center flex items-center justify-center">
        <div className="mx-auto my-5 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#DC2626"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />{" "}
          </svg>
        </div>
        <div className=" py-1 text-center sm:mt-0 sm:ml-4 sm:text-center">
          <div className="mt-2">
            <p className="text-md text-gray-500">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row py-3 lg:items-end lg:justify-end items-center justify-center flex-wrap gap-1">
        <Button
          margin={1.5}
          bgColor="black"
          size="base"
          rounded="md"
          title="Cancel"
          type="button"
          onClick={() => setOpen(false)}
        />
        <Button
          margin={1.5}
          title="Delete"
          textColor="white"
          rounded="md"
          size="base"
          bgColor="bg-deepBlue"
          type="button"
          onClick={handleDelete}
        />
      </div>
    </Modal>
  );
};

export default DeleteBox;
