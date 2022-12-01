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
  const [showModalAction, setShowModalAction] = useState(false);
  const navigate = useNavigate();

  const handleModalAction = () => {
    setShowModalAction(true);
  };

  const createBoard = async (values: Record<string, string>) => {
    await dispatch(createNewBoardThunk(values));
    setShowModalAction(false);
  };

  useEffect(() => {
    dispatch(getAllBoardsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="boards">
        <BoardsList />
        <Button
          className="create_board__button"
          buttonName="+"
          eventHandler={() => {
            handleModalAction();
          }}
        />
        {showModalAction && (
          <ModalAction
            formType={EItemType.createBoard}
            setShowModalAction={setShowModalAction}
            onSubmit={createBoard}
          />
        )}
      </div>
    </>
  );
};

export default Boards;
