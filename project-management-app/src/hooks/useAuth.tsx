import { useEffect, useState } from 'react';
import { ELocalStorage } from '../types';
import { api } from '../api';
import { userById } from '../store/thunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem(ELocalStorage.userId);
      const token = localStorage.getItem(ELocalStorage.token);

      if (userId && token) {
        api.setToken(token);
        await dispatch(userById(userId));
      }
      setLoading(false);
    })();
  }, [dispatch, isAuth]);

  return { isAuth, loading };
};
