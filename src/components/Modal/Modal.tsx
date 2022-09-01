import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

type Props = {
  onCloseModal: () => void;
  modalImage: string;
  tags: string;
};

export class Modal extends Component<Props> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscClosesModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscClosesModal);
  }

  handleEscClosesModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (e: React.SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    let { modalImage, tags } = this.props;
    let { handleBackdropClick } = this;
    console.log(modalImage);

    return createPortal(
      <S.Overlay onClick={handleBackdropClick}>
        <S.Modal>
          <img src={modalImage} alt={tags} />
        </S.Modal>
      </S.Overlay>,
      modalRoot!
    );
  }
}
