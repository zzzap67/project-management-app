import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from 'react';
import { cleanErrorState } from '../store/mainSlice';

export const useError = () => {
  const { error } = useAppSelector((state) => state.mainReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanErrorState());
  }, [dispatch]);

  //TODO Add tooltips
  if (error) {
    alert(error);
  }
};
