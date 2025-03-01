import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicAgentRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo?.role == "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default PublicAgentRouter;
