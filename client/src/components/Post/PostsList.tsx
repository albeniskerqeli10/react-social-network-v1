import { fetchPosts } from "../../api/PostApi";
import SuspenseWrapper from "../../shared/SuspenseWrapper";
import { IPost } from "../../types/PostInterfaces";
//@ts-ignore
import { lazy, useState, useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import SmallSpinner from "../../shared/SmallSpinner";
interface PostsListProps {
  data: IPost[];
  refetch: any;
}
const Post = lazy(() => import("./Post" /* webpackChunkName: "Post" */));
const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  // @ts-ignore
  // const prefetchPosts = async () => {
  //   await queryClient.prefetchQuery("posts", fetchPosts);
  // };

  // useEffect(() => {
  //   const prefetchData = async () => {
  //     const data: PostsListProps["data"] = await queryClient.fetchQuery(
  //       ["posts"],
  //       fetchPosts
  //     );
  //     if (data) {
  //       setPosts(data?.slice(0, 20));
  //     }
  //   };
  //   prefetchData();
  // }, []);
  useQuery(["posts"], fetchPosts, {
    onSuccess: (data: PostsListProps["data"]) => {
      setPosts(data);
    },

    onError: (err) => {
      alert("Error fetching posts");
    }

  });

  return (
    <div className="flex items-center justify-center flex-wrap w-full flex-col ">

      <SuspenseWrapper>

        {posts?.map((post: IPost) => (
          <Post key={post._id} post={post} />
        ))}
      </SuspenseWrapper>
    </div>
  );
};

export default PostsList;
