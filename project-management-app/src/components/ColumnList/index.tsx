import ColumnItem from 'components/ColumnItem';
import React, { useMemo } from 'react';
import './styles.css';
import { useAppSelector } from '../../store/hooks';

const ColumnList = () => {
  const { columns } = useAppSelector((state) => state.mainReducer);

  const columnList = useMemo(() => {
    console.log(columns);
    return Object.values(columns);
  }, [columns]);

  return (
    <div className="columnList">
      {columnList.map((column) => {
        return <ColumnItem {...column} key={column.id} />;
      })}
    </div>
  );
};
export default ColumnList;
