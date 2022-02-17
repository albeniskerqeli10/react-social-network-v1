
import React from "react";
import {useLocation, Navigate} from "react-router-dom";
import useAuth from "@hooks/useAuth";
  function ProtectedRoute({children}:{children:JSX.Element}) {
        const currentUser = useAuth();

        const location = useLocation();
    if(currentUser === null){
return <Navigate to="/login" state={{ from: location }} replace/>
    }
    else {
          return children

    }
        }
  
  
  export default ProtectedRoute;