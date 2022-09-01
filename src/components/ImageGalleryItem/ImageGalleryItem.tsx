import React from 'react';
import * as S from './ImageGalleryItem.styled';

type Props = {
  webformatURL: string;
  alt: string;
  onImgClick: () => void;
};

export const ImageGalleryItem: React.FC<Props> = ({
  webformatURL,
  alt,
  onImgClick,
}) => {
  return (
    <S.ImageGalleryItem onClick={onImgClick}>
      <img src={webformatURL} alt={alt} />
    </S.ImageGalleryItem>
  );
};
