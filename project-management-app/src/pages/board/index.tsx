import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  DragNDropTaskInOneColumnThunk,
  DragNDropTaskThunk,
  getAllTasksThunk,
  getBoardByIdThunk,
} from 'store/thunks';
import { ITask } from 'types';
import './styles.css';

const Board = () => {
  const { id } = useParams();
  const { tasks } = useAppSelector((state) => state.mainReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getBoardByIdThunk(id));
    }
  }, [dispatch, id]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (result.destination && id) {
      const boardId = id;
      const fromColumn = result.source.droppableId;
      const toColumn = result.destination.droppableId;
      const taskId = result.draggableId;
      const title = tasks[result.source.droppableId][result.draggableId].title;
      const description = tasks[result.source.droppableId][result.draggableId].description;
      const userId = user.id;
      const order = tasks[result.source.droppableId][result.draggableId].order;
      const destinationOrder = result.destination.index;
      fromColumn !== toColumn
        ? dispatch(
            DragNDropTaskThunk({
              boardId,
              fromColumn,
              toColumn,
              taskId,
              title,
              description,
              userId,
              order,
            })
          )
        : dispatch(
            DragNDropTaskInOneColumnThunk({
              boardId,
              fromColumn,
              destinationOrder,
              taskId,
              title,
              description,
              userId,
            })
          );
    }
  };

  return (
    <div className="board_page">
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnList />
      </DragDropContext>
      <Button
        className="create_column__button"
        buttonName={t('description.forms.createColumn')}
        eventHandler={() => navigate(`/board/${id}/column`)}
      />
    </div>
  );
};
export default Board;
