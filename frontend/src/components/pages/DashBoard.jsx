import React, { useEffect, useState, Suspense } from "react";
import { SideBar } from "../SideBar";
// import Balance from "../Balance";
import Users from "../Users";
import TransactionBox from "../TransactionBox";
import { useRecoilState } from "recoil";
import { transactionAtom } from "../../store/atom/TransactionInfo";
import axios from "../../axios";
import loading from "../../assets/imgs/Loading Square.gif";

const History = React.lazy(() => import("../History"));
const Header = React.lazy(() => import("../Header"));
const Balance = React.lazy(() => import("../Balance"));

const DashBoard = () => {
  const [info, setInfo] = useRecoilState(transactionAtom);
  const [errMsg, setErrMsg] = useState("");
  const [dashboardInfo, setDashBoardInfo] = useState({});
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

        setDashBoardInfo(response?.data);
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

  useEffect(() => {
    if (dashboardInfo.firstName) {
      setInfo((info) => ({
        ...info,
        display: false,
        firstName: dashboardInfo.firstName,
        lastName: dashboardInfo.lastName,
        accountId: dashboardInfo.accountId,
      }));
    }
  }, [dashboardInfo, setInfo]);

  if (errMsg) {
    return (
      <div className="flex w-full h-[100vh] bg-black justify-center items-center">
        <h1 className="text-white text-center text-7xl">{errMsg}</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-4xl sm:text-6xl bg-black flex flex-col justify-center items-center text-white w-full h-[100vh]">
        <img
          src={loading}
          alt="Loading..."
          className="w-[50%] sm:w-[40%] md:w-[30%]"
        />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-[black] w-full h-full min-h-[100dvh]">
      <SideBar active="Dashboard" />
      <TransactionBox />
      <div className="bg-black w-full h-full flex flex-col text-white pb-10">
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header username={dashboardInfo?.firstName} />
        </Suspense>
        <div className="flex justify-center m-auto gap-5 sm:mt-10 w-full sm:w-[70%] md:w-full flex-col md:flex-row">
          <div className="flex flex-col px-3 min-w-[40%] items-center justify-stretch">
			<Suspense fallback={<div>Loading Balance...</div>}>
			<Balance amount={dashboardInfo?.balance} />
			</Suspense>
            
            <Suspense fallback={<div>Loading History...</div>}>
              <History transactions={dashboardInfo?.transactions} />
            </Suspense>
          </div>
          <Suspense fallback={<div>Loading Users...</div>}>
            <Users />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
