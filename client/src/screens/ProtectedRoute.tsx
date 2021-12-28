
import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate, Route , Navigate,Outlet} from "react-router-dom";
import { RootState } from "@redux/store";
  function ProtectedRoute() {
    const currentUser = useSelector((state:RootState) => state.user.currentUser);
    const navigate = useNavigate();
    return (
     
          currentUser!= null ? <Outlet />: <Navigate to="/login" />
    )
        }
  
  
  export default ProtectedRoute;