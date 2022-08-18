import { fetchSingleUser } from "../api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types/UserInterfaces";
interface SingleUserProps {
  id: string;
  options?: any;
  data?: IUser;
}
export const singleUserKey = "FETCH SINGLE USER";
const useSingleUser = ({ id }: SingleUserProps) => {
  return useQuery([singleUserKey, id], fetchSingleUser, {
    onSuccess: (data: IUser) => {},
  });
};
export default useSingleUser;
