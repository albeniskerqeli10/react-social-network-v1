import PostsList from "../components/Post/PostsList";
import AddPost from "./Form/AddPost";

const Feed = () => (
  <section className="w-[450px]     flex flex-col justify-start items-center  my-1 min-h-[80vh] flex-wrap  gap-2 mx-2">
    <AddPost />

    <PostsList />
  </section>
);

export default Feed;
