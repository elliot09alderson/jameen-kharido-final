import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_BlockedAgents,
  admin_getAll_agents,
} from "../../../rtk/slices/adminSlice.js";
import user from "/image/user.webp";

const GetAllAgent = () => {
  const dispatch = useDispatch();
  const {
    loader,
    AdminInfo,
    BlockAgent,
    AgentInfo,
    AdInfo,
    errorMessage,
    successMessage,
  } = useSelector((state) => state.admin);

  const blockAgent = (item) => {
    if (!item.isAccountDisabled) {
      dispatch(admin_BlockedAgents(item._id))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            alert("Agent blocked successfully!");
          }
        })
        .catch((error) => {
          console.error("Error blocking agent:", error);
          alert("Failed to block agent");
        });
    }
  };
  return (
    <div>
      {AgentInfo?.map((item, idx) => {
        return (
          <div className="flex  gap-4">
            <p>{item.name}</p>
            <button
              className="p-1 border rounded-lg"
              onClick={() => blockAgent(item)}
            >
              {!item.isAccountDisabled ? "block Agent" : "unblock"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GetAllAgent;
