import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getBoardByIdThunk, createNewColumnThunk } from 'store/thunks';
import ModalAction from 'components/ModalAction';
import { EItemType } from 'types';
import './styles.css';

const Board = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [showModalAction, setShowModalAction] = useState(false);

  const handleModalAction = () => {
    setShowModalAction(true);
  };

  const createColumn = async (values: Record<string, string>) => {
    if (id) {
      await dispatch(createNewColumnThunk({ title: values.title, id }));
    }
    setShowModalAction(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getBoardByIdThunk(id));
    }
  }, [dispatch]);
  return (
    <div className="board_page">
      <div className="column_list">
        <ColumnList />
      </div>
      <Button
        className="create_column__button"
        buttonName={t('description.forms.createColumn')}
        eventHandler={() => handleModalAction()}
      />
      {showModalAction && (
        <ModalAction
          id=""
          title=""
          description=""
          formType={EItemType.createColumn}
          isReadOnly={false}
          isDescriptionNeeded={true}
          setShowModalAction={setShowModalAction}
          onSubmit={createColumn}
        />
      )}
    </div>
  );
};
export default Board;
