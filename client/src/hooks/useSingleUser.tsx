import { fetchSingleUser } from "../api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types/UserInterfaces";
// interface SingleUserProps {
//   id: string;
//   options?: any;
// }

export const singleUserKey = "FETCH SINGLE USER";
const useSingleUser = (id: string) => {

  const { data, isError: error } = useQuery([singleUserKey, id], fetchSingleUser, {
    onSuccess: (data: IUser) => {

    }




  });

  return { data, error }
};
export default useSingleUser;
