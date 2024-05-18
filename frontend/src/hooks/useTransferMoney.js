import { useState } from 'react';
import axios from '../axios';

const useTransferMoney = () => {
  const [errMsg, setErrMsg] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [msg, setMsg] = useState('');

  const transferMoney = async (id, amount) => {
    setIsTransferring(true);
    try {
      setErrMsg('');
      setMsg('');
      if (amount <= 0) {
        setErrMsg('Enter Amount more than 0');
        setIsTransferring(false);
        return;
      }
      const token = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios({
        method: 'post',
        url: '/account/transfer',
        headers: {
          authorization: token,
        },
        data: {
          to: id,
          amount: amount,
        },
      });
      setMsg(response?.data?.message);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error?.response) {
        setErrMsg(error?.response?.data?.message);
      }
    }
    setIsTransferring(false);
  };

  return {
    errMsg,
    isTransferring,
    msg,
    transferMoney,
  };
};

export default useTransferMoney;
