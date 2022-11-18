import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getAllColumnsThunk } from 'store/thunks';
import './styles.css';

const Board = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getAllColumnsThunk(id as string));
    }
  }, [dispatch, id]);

  return (
    <div className="board_page">
      <div className="column_list">
        <ColumnList />
      </div>
      <Button
        className="create_column__button"
        buttonName={t('description.forms.createColumn')}
        eventHandler={() => navigate(`/board/${id}/column`)}
      />
    </div>
  );
};
export default Board;
