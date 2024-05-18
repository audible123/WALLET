// hooks/useTransactions.js
import { useState, useEffect } from "react";
import axios from "../axios";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = `Bearer ${localStorage.getItem("token")}`;
      try {
        const response1 = await axios({
          method: "get",
          url: "/account/info",
          headers: {
            authorization: token,
          },
        });
        const response2 = await axios({
          method: "get",
          url: "/account/transactions",
          headers: {
            authorization: token,
          },
        });

        setAccountInfo({
          firstName: response1.data.firstName,
          lastName: response1.data.lastName,
          accountId: response1.data.accountId,
        });
        setTransactions(response2.data.transactions);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else {
          setErrMsg(error?.response?.data?.message);
        }
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, accountInfo, errMsg, isLoading };
};

export default useTransactions;
