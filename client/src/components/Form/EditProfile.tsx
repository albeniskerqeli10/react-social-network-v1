import { editUser } from "../../api/UserApi";
import { addNewUser } from "../../redux/slices/userSlice";
import Button from "../../shared/Button";
import Modal from "../../shared/Modal";
import Compressor from "compressorjs";
import {useState,ChangeEvent} from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AuthProps } from "types/UserInterfaces";
import { queryClient } from "../../App";
const EditProfile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [avatar, setAvatar] = useState<string | Blob>("");
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      e.preventDefault();

      const file = e.target.files[0];

      new Compressor(file, {
        quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
        // convertTypes:['image/png', 'image/webp', 'images/jpg'],
        success: (compressedResult) => {
          setAvatar(compressedResult);
        },
      });
    }
  };
  const editProfileMutation = useMutation(editUser as any, {
    onSuccess: (data: any) => {
      const userObj = JSON.parse(localStorage.getItem("userDetails") || "{}");
      userObj.avatar = data.avatar;

      userObj.username = data.username;
      userObj.email = data.email;
      dispatch(addNewUser(userObj));

      localStorage.setItem("userDetails", JSON.stringify(userObj));
      queryClient.invalidateQueries();
    },
  });
  const handleEdit = (data: AuthProps) => {
    if (data.username || data.email || avatar) {
      const formUser: FormData = new FormData();
      data.username && formUser.append("username", data.username as string);
      data.email && formUser.append("email", data.email);
      if (avatar) {
        formUser.append("avatar", avatar);
      }
      editProfileMutation.mutate(formUser as any);
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <h1>Edit Profile</h1>
      <form className="w-full flex flex-col items-start justify-center flex-wrap gap-3">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Username
        </label>
        <input
          {...register("username", {})}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Your Username"
        />
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Email
        </label>
        <input
          {...register("email", {
            // pattern:
            //   /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="email"
          placeholder="Your Email"
        />
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Avatar
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="file"
          onChange={handleAvatar}
          type="file"
          placeholder="Your Avatar"
        />
        <div className="w-full flex flex-row py-3 items-end justify-end flex-wrap gap-1">
          <Button
            margin={1.5}
            bgColor="white"
            size="sm"
            borderColor="gray-300"
            textColor="gray-700"
            rounded="md"
            title="Cancel"
            type="button"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            title="Submit"
            size="sm"
            textColor="white"
            rounded="md"
            bgColor="bg-deepBlue"
            margin={1}
            onClick={handleSubmit(handleEdit as any)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;
