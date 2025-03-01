import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const GetAllBlockedAgent = () => {
  const { loader, AdminInfo, AgentInfo, AdInfo, errorMessage, successMessage } =
    useSelector((state) => state.admin);

  useEffect(() => {
    console.log(AdminInfo);
  }, []);

  return (
    <div>
      {AdminInfo?.blockedAgents?.map((item, idx) => {
        return <p> {item} </p>;
      })}
    </div>
  );
};

export default GetAllBlockedAgent;
