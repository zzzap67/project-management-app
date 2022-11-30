import { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import './styles.css';
import { EItemType } from 'types';
import Form from 'components/Form';
import { ru } from 'components/locales/ru';

interface IModalAction {
  formType: EItemType;
  setShowModalAction: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: Record<string, string>) => Promise<void>;
}

function ModalAction({ formType, setShowModalAction, onSubmit }: IModalAction) {
  let registerData = ru.BOARD_FORM || ru.COLUMN_FORM;
  let className = '';

  switch (formType) {
    case EItemType.createBoard:
      registerData = ru.BOARD_FORM;
      className = 'form_board';
      break;
    case EItemType.createColumn:
      registerData = ru.COLUMN_FORM;
      className = 'form_column';
      break;
    case EItemType.createTask:
      registerData = ru.TASK_FORM;
      className = 'form_task';
      break;
  }

  const handleCallback = (values: Record<string, string>) => {
    onSubmit(values);
    setShowModalAction(false);
  };

  return createPortal(
    <div className="modalAction">
      <div className="modalActionContent">
        <Form
          formData={registerData}
          errorMessage={''}
          className={className}
          onSubmit={handleCallback}
          onCancel={setShowModalAction}
        />
      </div>
    </div>,
    document.getElementById('modal') as Element
  );
}

export default ModalAction;
