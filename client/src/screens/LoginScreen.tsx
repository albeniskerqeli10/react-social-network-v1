import { loginUser } from "@api/UserApi";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { addNewUser } from "@redux/slices/userSlice";
import { RootState } from "@redux/store";
import Button from "@shared/Button";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthProps, IUser } from "../types/UserInterfaces";

const LoginScreen: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customErr, setCustomErr] = useState<string>("");
  useEffect(() => {
    currentUser !== null && navigate("/");
  }, [currentUser, navigate]);
  const mutations = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("userDetails", JSON.stringify(data));
      dispatch(addNewUser(data as IUser));
      setCustomErr("");
    },
    onError: (err:any) => {
      const { message } = err?.response.data;
      setCustomErr(message);

    },
  });


  const handleLogin = (data: AuthProps) => {
    if (data.email !== "" || data.password !== "") {
      mutations.mutate({
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <div className="w-full flex flex-col  flex-wrap items-center justify-center min-h-[80vh] lg:mt-20">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex  w-[90%] md:w-auto  bg-white items-center justify-center  flex-col flex-wrap shadow-md rounded px-4 pt-6 pb-8 mb-4"
      >
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
              className=" w-full px-4  flex flex-row flex-1 items-center justify-center  py-4 my-4 leading-normal text-white  bg-red-500 rounded-lg"
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
              className="px-4 w-64 text-md  text-center flex flex-row flex-1 items-center justify-center py-2  leading-normal text-white my-4  bg-red-500 rounded-lg"
              role="alert"
            >
              <p> Write a password with minimum 8 characters</p>
            </div>
          )}
        </div>
        {customErr !== "" ? (
          <div
            className="px-4  flex flex-row flex-wrap flex-1 items-center justify-between py-4 mb-4 leading-normal text-white  bg-red-500 rounded-lg"
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
            bgColor="primary"
            margin="1"
           size="fluid"
            textColor="white"
            hover="gray-800"
            title="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
