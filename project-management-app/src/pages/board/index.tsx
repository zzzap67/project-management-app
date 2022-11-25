import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect } from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  DragNDropTaskInOneColumnThunk,
  DragNDropTaskThunk,
  getAllBoardsThunk,
  getAllTasksThunk,
  getBoardByIdThunk,
} from 'store/thunks';
import { ITask } from 'types';
import './styles.css';

const Board = () => {
  const { id } = useParams();
  const { tasks } = useAppSelector((state) => state.mainReducer);
  const state = useAppSelector((state) => state.mainReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getBoardByIdThunk(id));
    }
  }, [dispatch, id]);

  const getClearId = (str: string) => {
    return str.replace(/\w*\//, '');
  };
  const compareDroppableContext = (str: string, compareStr: string) => {
    return str.includes(compareStr);
  };
  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (result.destination && id) {
      const boardId = id;
      const fromColumn = getClearId(result.source.droppableId);
      const toColumn = getClearId(result.destination.droppableId);
      const taskId = getClearId(result.draggableId);
      const title = tasks[fromColumn][taskId].title;
      const description = tasks[fromColumn][taskId].description;
      const userId = user.id;
      const order = tasks[fromColumn][taskId].order;
      const destinationOrder = String(result.destination.index);
      switch (true) {
        case fromColumn !== toColumn &&
          compareDroppableContext(result.destination.droppableId, 'column'):
          dispatch(
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
          );
          break;
        case fromColumn === toColumn &&
          compareDroppableContext(result.destination.droppableId, 'column'):
          dispatch(
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
          break;
      }
    }
  };

  return (
    <div className="board_page">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`board/${id}`} type="BOARD">
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ColumnList />
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
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
