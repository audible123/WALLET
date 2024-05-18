// hooks/useDashboardInfo.js
import { useState, useEffect } from "react";
import axios from "../axios";

const useDashboardInfo = () => {
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      const token = `Bearer ${localStorage.getItem("token")}`;
      try {
        const response = await axios({
          method: "get",
          url: "/user/dashboard",
          headers: {
            authorization: token,
          },
        });

        setDashboardInfo(response?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg(error?.response?.data?.message || "Failed to fetch data");
        }
      }
    };

    fetchDashboardInfo();
  }, []);

  return { dashboardInfo, errMsg, isLoading };
};

export default useDashboardInfo;
