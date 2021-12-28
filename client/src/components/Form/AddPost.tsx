import { addPost } from "@api/PostApi";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { RootState } from "@redux/store";
import Avatar from "@shared/Avatar";
import Button from "@shared/Button";
import Compressor from "compressorjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { queryClient } from "../../App";

interface ISubmitForm {
  textarea:string;
}
 function AddPost()  {
  const { register, reset, handleSubmit } = useForm();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
const [customErr , setCustomErr] = useState('');
  const mutations = useMutation(addPost
  );

  const [fileName, setFileName] = useState<Blob | File | string>('');
  const [selectedImg, setSelectedImg] = useState<string>("");

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
const target = e.target as HTMLInputElement;
    const file:File = target.files![0];
    if(file?.type.match('image.*') ) {
      new Compressor(file, {
        quality: 0.6,
        success: (compressedResult:File | Blob) => {
          setFileName(compressedResult );
        },
      });
      setCustomErr('');
      const reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
        setSelectedImg(e?.target?.result as string);
    };
    reader.readAsDataURL(file);
    }
    else {
      setCustomErr('File should be only image and not other file types');
    }

  };


  function submitPost(data: ISubmitForm) {
    // handle the click event
    const formData:any= new FormData();
    if (data.textarea === "") {
      setCustomErr("Write some text or  upload an image  to create a post");
    } else {
      formData.append("text", data.textarea);
      formData.append("image", fileName);
      mutations.mutate(formData , {
        onSuccess:() => {
          queryClient.invalidateQueries("posts");
          setCustomErr('');

        }
      });

      setSelectedImg("");

      setFileName("");
      reset();
    }
  };
  return (
    <div className="w-full min-h-[100px] flex flex-col items-center justify-center  flex-wrap  bg-white rounded-lg border gap-2 border-[#F5F7F9] shadow-md   ">
      <div className="w-full  flex-wrap flex text-center  gap-1 flex-row items-center lg:justify-between ">
        <div className="flex w-auto  items-center justify-center flex-wrap flex-row">
          <Avatar alt="User avatar" radius="sm" src={currentUser.avatar} />
        </div>
        <div className="flex md:w-auto w-full flex-1  items-center justify-center  flex-wrap flex-row">
          <textarea
            {...register("textarea")}
            className="flex w-32 md:w-auto  md:mx-1 mx-2 items-center   md:flex-1  flex-initial font-bold  my-2  px-1  resize-none self-center  "
            placeholder="Write Something"
          ></textarea>
          <label
            className="bg-zinc-900  my-1 p-3 text-white font-inter hover:bg-primary cursor-pointer focus:ring-primary gap-2 focus:ring-opacity-50 flex flex-row flex-wrap items-center justify-center  mx-1  rounded-lg  md:flex-initial"
            htmlFor="upload"
          >
            <h4>Photo</h4>
            <FiImage />
          </label>
        </div>
        <input
          type="file"
          name="upload"
          id="upload"
          title=" "
        
          onChange={onChangeFile}
          accept="image/x-png,image/gif,image/jpeg"
          hidden
        />
      </div>
      <div className="w-full flex flex-col flex-wrap items-center justify-center">
        {selectedImg ? <img src={selectedImg} alt="Selected Media" /> : ""}
      </div>
     {customErr &&  <h1 className="text-sm text-gray-700">{customErr}</h1>}
      <div className="flex w-full bg-primary flex-row items-center justify-center flex-wrap">
        <Button
          type="button"
          onClick={handleSubmit(submitPost)}
          bgColor="transparent"
          margin="1"
          title="Post it"
          size="fluid"
          textColor="white"
          rounded="sm"
          hover="purple-700"
        />
      </div>
    </div>
  );
};

export default AddPost;
