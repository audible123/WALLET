import { useState, useEffect } from 'react';
import axios from '../axios';

const useFetchUsers = (searchTerm) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      const token = `Bearer ${localStorage.getItem('token')}`;

      try {
        const response = await axios.get(`/user/search?filter=${searchTerm}`, {
          headers: { authorization: token },
        });
        setUsers(response.data.users);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return { users, isLoading, error };
};

export default useFetchUsers;
