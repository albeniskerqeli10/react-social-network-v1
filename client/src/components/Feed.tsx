import { fetchPosts } from '@api/PostApi';
import React, { memo } from 'react';
import { useQuery } from "react-query";
import FormContainer from "./Form/AddPost";
import Post from "./Post/Post";
 const Feed = memo(() =>  {
const {data:posts,status} =  useQuery("posts" ,fetchPosts);



  return (
    <section className="w-[450px]    flex flex-col justify-center items-center  my-1 min-h-[80vh] flex-wrap  gap-2 mx-2">

      <FormContainer />

       
      {posts?.length !== 0 ? posts?.slice(0,15).map(function(post) {
        return(
          <Post username={post.username} avatar={post.avatar} image={post.image}  likes={post.likes}  text={post.text}  _id={post._id} key={post._id} user={post.user}/>
        )
          
      }
        ):<h1 className="text-2xl text-slate-900 my-4 p-2 font-bold ">No Posts</h1>
      }



    </section>
  );
});

export default Feed;
