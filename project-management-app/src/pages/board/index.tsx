import ColumnList from 'components/ColumnList';
import Button from 'components/ui/button';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalAction from 'components/ModalAction';
import { EItemType } from 'types';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  DragNDropColumnThunk,
  DragNDropTaskInOneColumnThunk,
  DragNDropTaskThunk,
  getBoardByIdThunk,
  createNewColumnThunk,
} from 'store/thunks';
import './styles.css';

const Board = () => {
  const { id } = useParams();
  const { tasks, columns } = useAppSelector((state) => state.mainReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  }, [dispatch, id]);

  const getClearId = (str: string) => {
    return str.replace(/\w*\//, '');
  };
  const onDragEnd = (result: DropResult) => {
    if (result.destination && id) {
      const boardId = id;
      const fromColumn = getClearId(result.source.droppableId);
      const toColumn = getClearId(result.destination.droppableId);
      const taskId = getClearId(result.draggableId);
      const title = tasks[fromColumn][taskId]?.title;
      const description = tasks[fromColumn][taskId]?.description;
      const userId = user.id;
      const order = tasks[fromColumn][taskId]?.order;
      const destinationOrder = String(result.destination.index);
      const columnId = getClearId(result.draggableId);
      const columnTitle = columns[columnId]?.title;
      const columnDestinationOrder = String(result.destination.index);

      switch (true) {
        case result.type === 'COLUMN':
          dispatch(
            DragNDropColumnThunk({
              boardId,
              columnId,
              columnDestinationOrder,
              columnTitle,
              userId,
            })
          );

          break;

        case fromColumn !== toColumn && result.type === 'TASK':
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
        case fromColumn === toColumn && result.type === 'TASK':
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
      <Button
        className="go_back__button"
        buttonName={t('description.forms.goBackButton')}
        eventHandler={() => navigate(`/boards`)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`board/${id}`} type="BOARD" direction="horizontal">
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
