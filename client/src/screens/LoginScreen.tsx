import { loginUser } from "../api/UserApi";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { addNewUser } from "../redux/slices/userSlice";
import Button from "../shared/Button";
//@ts-ignore
import { useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthProps, IUser } from "../types/UserInterfaces";

const LoginScreen = () => {
  const currentUser = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const [customErr, setCustomErr] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  const handleLogin = (data: AuthProps) => {
    if (data.email !== "" || data.password !== "") {
      loginMutation.mutate(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: (data) => {
            startTransition(() => {
              dispatch(addNewUser(data as IUser));
              setCustomErr("");
            });
          },

          onError: (err) => {

            console.log(err, 'Error');

            setCustomErr("Incorrect email or password");
          },
        }
      );
    }
  };

  return currentUser === null ? (
    <div className="w-full flex flex-col  flex-wrap items-center justify-center min-h-[80vh] ">

      <form
        onSubmit={handleSubmit(handleLogin as any)}
        className="flex  w-[100%] md:w-[300px]  bg-white items-center justify-center  flex-col flex-wrap shadow-md rounded min-h-[300px] px-4 py-10 mb-4"
      >
        <h1 className="text-xl py-2 font-bold font-inter">Login</h1>

        <div className="mb-6 w-full flex flex-wrap flex-col items-start justify-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="username"
            type="email"
            placeholder="Your Email"
            required
          />
          {errors.email && (
            <div
              className=" w-full px-4  flex flex-row flex-1 items-center justify-center  py-4 my-4 leading-normal text-black  bg-red-500 rounded-lg"
              role="alert"
            >
              <p>Please write a valid email</p>
            </div>
          )}
        </div>
        <div className="mb-6 w-full flex flex-wrap flex-col items-start justify-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            name="password"
            type="password"
            placeholder="Your Password"
            required
          />
          {errors.password && (
            <div
              className="px-4 w-64 text-md  text-center flex flex-row flex-1 items-center justify-center py-2  leading-normal text-black my-4  bg-red-500 rounded-lg"
              role="alert"
            >
              <p> Write a password with minimum 8 characters</p>
            </div>
          )}
        </div>
        {customErr !== "" ? (
          <div
            className="px-4  flex flex-row flex-wrap flex-1 items-center justify-between py-4 mb-4 leading-normal text-black  bg-red-500 rounded-lg"
            role="alert"
          >
            <p>{customErr}</p>
            <i className="cursor-pointer" onClick={(e) => setCustomErr("")}>
              <FaTimes />
            </i>
          </div>
        ) : (
          ""
        )}
        <div className="w-full flex items-center  flex-row flex-wrap justify-center">
          <Button
            type="submit"
            bgColor="bg-deepBlue"
            margin="1"
            size="fluid"
            textColor="white"
            hover="gray-800"
            title="Sign In"
          />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default LoginScreen;
