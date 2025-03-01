import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicAgentRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo?.role == "agent") {
    return <Navigate to="/agent/myAds" replace />;
  }

  return <Outlet />;
};

export default PublicAgentRouter;
