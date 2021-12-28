import { fetchSingleUser } from "@api/UserApi";
import { useQuery } from "react-query";
import { IUser } from "types/UserInterfaces";
interface SingleUserProps {
  id: string;
  options?: any;
  data?: IUser;
}
export const singleUserKey = "FETCH SINGLE USER";
const useSingleUser = ({ id }: SingleUserProps) => {
  return useQuery([singleUserKey, id], fetchSingleUser, {suspense:true,
    refetchOnWindowFocus: false,
    onSuccess:(data:IUser)=>{}
  });
};
export default useSingleUser;
