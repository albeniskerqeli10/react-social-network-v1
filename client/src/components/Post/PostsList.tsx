import { fetchPosts } from "../../api/PostApi";
import SuspenseWrapper from "../../shared/SuspenseWrapper";
import { IPost } from "../../types/PostInterfaces";
import { lazy, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
    onError: (err: any) => {
      setPosts((posts: IPost[]) => posts);
    },
  });

  return (
    <div className="flex items-center justify-center flex-wrap w-full flex-col ">
      <SuspenseWrapper>
        {posts.map((post: IPost) => (
          <Post post={post} />
        ))}
      </SuspenseWrapper>
    </div>
  );
};

export default PostsList;
