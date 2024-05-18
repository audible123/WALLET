import { useState } from 'react';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const signUp = async (signUpData) => {
    setErrorMsg('');
    if (
      signUpData.username.trim() === '' ||
      signUpData.password.trim() === '' ||
      signUpData.firstName.trim() === '' ||
      signUpData.lastName.trim() === ''
    ) {
      setErrorMsg('Please Enter Credential');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post('/user/signup', signUpData);
      login(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      if (!error?.response) {
        setErrorMsg('No Server Response');
      } else {
        setErrorMsg(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, errorMsg };
};

export default useSignUp;
