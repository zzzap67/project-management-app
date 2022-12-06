import React from 'react';
import './styles.css';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../store/hooks';
import { selectAnyLoading } from '../../store/selectors';

function Preloader() {
  const isLoading = useAppSelector(selectAnyLoading);

  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>,
    document.getElementById('tooltip') as HTMLDivElement
  );
}

export default Preloader;
