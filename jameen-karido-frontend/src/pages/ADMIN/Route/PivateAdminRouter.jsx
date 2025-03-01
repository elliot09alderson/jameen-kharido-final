import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PivateAgentRouter = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo && userInfo?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PivateAgentRouter;
