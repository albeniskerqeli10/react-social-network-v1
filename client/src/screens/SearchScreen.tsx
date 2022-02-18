import useAuth from "@hooks/useAuth";
import { RootState } from "@redux/store";
import Button from "@shared/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SearchScreen = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();
  // grabbing data from redux-toolkit slice
  const searchResults = useSelector((state: RootState) => state.user.usersList);
  // a function to redirect user to it's page
  const redirectUser = function (id: string) {
    // redirect to profile page  if user id is same as active user id
    if (currentUser._id === id) {
      navigate("../profile");
    } else {
      navigate(`../user/${id}`);
    }
  };

  return (
    <div className="mt-20 w-full min-h-[60vh] flex-wrap  flex gap-5 flex-col items-center justify-center">
      {searchResults?.length !== 0 ? (
        searchResults?.map((user) => (
          <div className="w-full max-w-sm bg-white rounded-sm min-h-[70px] py-1 my-2 flex flex-row items-center md:justify-between justify-center flex-wrap gap-3 shadow-box ">
            <div className=" w-auto flex flex-1 items-center justify-start flex-wrap flex-row ">
              <img
                className="w-10 mx-2 h-10 rounded-full object-cover"
                src={user.avatar as string}
                alt="User pic"
              />
              {currentUser._id === user._id ? (
                <h1 className="text-center mx-3 ">{user.username} (You)</h1>
              ) : (
                <h1 className="text-center mx-3 whitespace-nowrap	overflow-hidden  text-ellipsis ">
                  {user.username}
                </h1>
              )}
            </div>
            <Button
              onClick={() => redirectUser(user._id)}
              bgColor="bg-deepBlue"
              size="md"
              margin={2}
              textColor="white"
              title="View"
            />
          </div>
        ))
      ) : (
        <h1>No user found </h1>
      )}
    </div>
  );
};

export default SearchScreen;
