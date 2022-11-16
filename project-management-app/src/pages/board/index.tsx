import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';

const Board = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="board_page">
      <div className="column_list">
        <ColumnList />
      </div>
      <Button
        className="create_column__button"
        buttonName={t('description.forms.createColumn')}
        eventHandler={() => navigate('/board/:id/column')}
      />
    </div>
  );
};
export default Board;
