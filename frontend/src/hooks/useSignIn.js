import { useState } from 'react';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const signIn = async (signInData) => {
    if (signInData.username.trim() === '' || signInData.password.trim() === '') {
      setErrorMsg('Please Enter Credential');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: 'user/signin',
        data: signInData,
      });
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
      } else if (error?.response) {
        setErrorMsg(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMsg,
    signIn,
    setErrorMsg,
  };
};

export default useSignIn;
