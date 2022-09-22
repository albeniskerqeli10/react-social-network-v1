import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const currentUser = useAuth();

  const location = useLocation();
  if (currentUser === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
