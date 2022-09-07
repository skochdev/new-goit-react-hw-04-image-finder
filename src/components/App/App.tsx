import React, { useState } from 'react';
import { Box } from '../../utils/Box';
import { GlobalStyle } from '../../global-styles/GlobalStyle';
import * as S from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <>
      <GlobalStyle />
      <Box as="main">
        <S.App>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery query={query} />
        </S.App>
      </Box>
    </>
  );
};
