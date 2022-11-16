import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { getAllBoardsThunk, getAllColumnsThunk } from 'store/thunks';

const Board = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getLocationId = (path: string) => {
    const splitedPath: string[] = path.split('/');
    return splitedPath[splitedPath.length - 1];
  };

  useEffect(() => {
    dispatch(getAllColumnsThunk(getLocationId(location.pathname)));
  }, [dispatch]);

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
