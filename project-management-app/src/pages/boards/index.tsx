import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardsList from 'components/BoardsList';
import { useAppDispatch } from '../../store/hooks';
import { getAllBoardsThunk, createNewBoardThunk } from '../../store/thunks';
import Button from 'components/ui/button';
import './styles.css';
import ModalAction from 'components/ModalAction';
import { EItemType } from 'types';
import { t } from 'i18next';

const Boards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="boards">
        <BoardsList />
      </div>
    </>
  );
};

export default Boards;
