import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return currentUser;
};

export default useAuth;
