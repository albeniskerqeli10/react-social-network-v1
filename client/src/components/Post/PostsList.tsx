
import {useQuery} from 'react-query';
import {fetchPosts} from '@api/PostApi';
import {Suspense, useMemo, lazy} from "react";
import Loader from "@shared/Loader";
import SmallSpinner from '@shared/SmallSpinner';
const Post =  lazy(() => import("./Post" /* webpackChunkName: "Post" */));
const PostsList = () => {
  
  const {data:posts} =  useQuery("posts" ,fetchPosts ,{
  });
  

  // const slicedPosts = useMemo(() => {
  //   return posts?.slice(0,20)
  // },[posts])


  return (
    <Suspense fallback={<SmallSpinner/>}>
    <div className="flex items-center justify-center flex-wrap w-full">
 
        {posts?.length !== 0 && posts?.map(post => (
            <Post username={post.username} avatar={post.avatar} image={post.image}  likes={post.likes}  text={post.text}  _id={post._id} key={post._id} user={post.user}/>
            
       ))}
      
    </div>
    </Suspense>
  )
}

export default PostsList
