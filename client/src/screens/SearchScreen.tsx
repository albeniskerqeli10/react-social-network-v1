import useAuth from "../hooks/useAuth";
import { RootState } from "../redux/store";
import Button from "../shared/Button";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import SuspenseWrapper from "../shared/SuspenseWrapper";
const SearchScreen = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const location = useLocation();
  const endOfSearchURL = location.pathname.split("search/").pop();
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
    <section className="mt-10 w-full min-h-[60vh] flex-wrap  flex  flex-row items-center justify-center">
      <h1 className="py-3 text-xl font-bold"> Search results with {endOfSearchURL} </h1>
      <div className="container px-[55px] md:mx-auto h-[400px] overflow-y-scroll flex flex-row items-center justify-center   flex-wrap    ">
        <SuspenseWrapper>
          {searchResults?.length !== 0 ? (
            searchResults?.map((user) => (
              <div className="w-full   bg-white rounded-sm min-h-[70px] py-1 my-2 flex flex-row items-center md:justify-between justify-center flex-wrap px-0 gap-3 shadow-box ">
                <div className=" w-auto flex flex-1 items-center justify-start flex-wrap flex-row ">
                  <img
                    decoding="async"
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

        </SuspenseWrapper>
      </div>
    </section>
  );
};

export default SearchScreen;
