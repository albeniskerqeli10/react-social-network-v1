import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import { RootState } from "@redux/store";

const useAuth = () => {
    const currentUser = useSelector((state:RootState) => state.user.currentUser)

   return currentUser;
}

export default useAuth;