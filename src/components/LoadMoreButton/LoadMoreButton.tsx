import * as S from './LoadMoreButton.styled';
import React from 'react';

interface Props {
  onLoadMore: () => void;
}

export const LoadMoreButton: React.FC<Props> = ({ onLoadMore }) => {
  return <S.LoadMoreButton onClick={onLoadMore}>Load More</S.LoadMoreButton>;
};
