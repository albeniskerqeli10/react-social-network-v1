import { registerUser } from "../api/UserApi";
import useAuth from "../hooks/useAuth";
import { addNewUser } from "../redux/slices/userSlice";
import Button from "../shared/Button";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthProps, IUser } from "../types/UserInterfaces";

const RegisterScreen: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | Blob>("");
  const dispatch = useDispatch();

  const userMutation = useMutation(registerUser, {
    onSuccess: ({ data }) => {
      localStorage.setItem("userDetails", JSON.stringify(data));
      dispatch(addNewUser(data as IUser));
    },
  });

  useEffect(() => {
    currentUser !== null && navigate("/");
  }, [currentUser, navigate]);

  const handleRegister = (data: AuthProps) => {
    if (data.username === "" || data.email === "" || data.password === "") {
      alert("Please fill in required fields");
    } else {
      const formUser: FormData = new FormData();
      formUser.append("username", data.username as string);
      formUser.append("email", data.email);
      if (avatar) {
        formUser.append("avatar", avatar);
      }
      formUser.append("password", data.password);
      userMutation.mutate(formUser);
    }
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      e.preventDefault();
      new Compressor(file, {
        quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
        // convertTypes:['image/png', 'image/webp', 'images/jpg'],
        success: (compressedResult) => {
          setAvatar(compressedResult);
        },
      });
    }
  };

  return (
    <div className="w-full lg:mt-20 flex flex-col items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleRegister as any)}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="username"
            type="text"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: true,
              // pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            })}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="email"
            type="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Avatar (optional)
          </label>
          <input
            onChange={handleAvatar}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="file"
            type="file"
            placeholder="Your Avatar "
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>

          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            bgColor="bg-deepBlue"
            margin="1"
            size="md"
            textColor="white"
            hover="gray-800"
            title="Sign Up"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
