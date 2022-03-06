import { fetchPosts } from "@api/PostApi";
import SmallSpinner from "@shared/SmallSpinner";
import { lazy, Suspense } from "react";
import { useQuery } from "react-query";
const Post = lazy(() => import("./Post" /* webpackChunkName: "Post" */));
const PostsList = () => {
  const { data: posts } = useQuery("posts", fetchPosts, {});

  return (
    <Suspense fallback={<SmallSpinner />}>
      <div className="flex items-center justify-center flex-wrap w-full">
        {posts?.length !== 0 &&
          posts?.map((post) => (
            <Post
              username={post.username}
              avatar={post.avatar}
              image={post.image}
              likes={post.likes}
              text={post.text}
              _id={post._id}
              key={post._id}
              user={post.user}
            />
          ))}
      </div>
    </Suspense>
  );
};

export default PostsList;
