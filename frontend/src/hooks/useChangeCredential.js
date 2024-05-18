import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const useChangeCredential = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [exitMsg, setExitMsg] = useState('');

  const changeCredential = async (credentials) => {
    try {
      const body = { ...credentials };
      Object.keys(body).forEach((key) => {
        if (body[key].trim() === '') {
          delete body[key];
        }
      });
      if (Object.keys(body).length === 0) {
        setErrMsg('Please Enter New Credential');
        return;
      }
      setIsLoading(true);
      const token = `Bearer ${localStorage.getItem('token')}`;
      await axios.put('/user/change', body, {
        headers: { authorization: token },
      });
      setExitMsg('Updated Successfully, redirecting to Dashboard....');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { changeCredential, isLoading, errMsg, exitMsg, setExitMsg };
};

export default useChangeCredential;
