import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

import './styles.css';
import { EItemType } from 'types';
import Form from 'components/Form';
import { ru } from 'components/locales/ru';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardByIdThunk } from 'store/thunks';
import { useAppDispatch } from 'store/hooks';

interface IModalAction {
  itemType: EItemType;
  isReadOnly: boolean;
  isDescriptionNeeded: boolean;
  id: string;
  title: string;
  description: string;
  userId: string;
  setShowModalAction: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

function ModalAction({ itemType, setShowModalAction, onSubmit }: IModalAction) {
  const registerData = ru.BOARD_FORM;
  const registerDataColumn = ru.COLUMN_FORM;
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const boardId = params.id;
  const dispatch = useAppDispatch();
  const handleCallback = (values: Record<string, string>) => {
    onSubmit(values);
    setShowModalAction(false);
    navigate(`/board/${boardId}`);
    if (boardId) dispatch(getBoardByIdThunk(boardId));
  };
  const closeModal = () => {
    setShowModalAction(false);
    navigate(`/board/${boardId}`);
    if (boardId) dispatch(getBoardByIdThunk(boardId));
  };
  return createPortal(
    <div className="modalAction">
      <div className="modalActionContent">
        {itemType === 'column' ? (
          <Form
            formData={registerDataColumn}
            errorMessage={''}
            className={'form_column'}
            onSubmit={handleCallback}
            onCancel={closeModal}
          />
        ) : (
          <Form
            formData={registerData}
            errorMessage={''}
            className={'form_board'}
            onSubmit={handleCallback}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalAction;
