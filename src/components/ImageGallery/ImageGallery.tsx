import React from 'react';
import { Image } from '../App';
import * as S from './ImageGallery.styled';

interface Props {
  images: Image[];
}

export const ImageGallery: React.FC<Props> = ({ images }) => {
  return (
    <S.ImageGallery>
      {images.map(({ webformatURL, id }) => (
        <li key={id}>
          <img src={webformatURL} alt={id} />
        </li>
      ))}
    </S.ImageGallery>
  );
};
