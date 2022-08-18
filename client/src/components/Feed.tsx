import SuspenseWrapper from "../shared/SuspenseWrapper";
import {lazy} from "react";
import PostsList from "../components/Post/PostsList";
import Button from "../shared/Button";
const AddPost = lazy(() => import("./Form/AddPost"));

const Feed = () => (
  <section className="w-[450px]    flex flex-col justify-start items-center  my-1 min-h-[80vh] flex-wrap  gap-2 mx-2">
    <SuspenseWrapper>
      <AddPost />
    </SuspenseWrapper>

    <PostsList />
  </section>
);

export default Feed;
