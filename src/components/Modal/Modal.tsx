import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

type Props = {
  onCloseModal: () => void;
  modalImage: string;
  tags: string;
};

export const Modal: React.FC<Props> = ({ onCloseModal, modalImage, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscClosesModal);

    return () => {
      window.removeEventListener('keydown', handleEscClosesModal);
    };
  }, []);

  const handleEscClosesModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      console.log('on');
      onCloseModal();
    }
  };

  const handleBackdropClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      console.log('off');
      onCloseModal();
    }
  };

  return createPortal(
    <S.Overlay onClick={handleBackdropClick}>
      <S.Modal>
        <img src={modalImage} alt={tags} />
      </S.Modal>
    </S.Overlay>,
    modalRoot!
  );
};
