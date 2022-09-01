import React, { Component } from 'react';
import { Box } from '../../utils/Box';
import { GlobalStyle } from '../../global-styles/GlobalStyle';
import * as S from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';

interface State {
  searchQuery: string;
}

export class App extends Component<{}, State> {
  state = {
    searchQuery: '',
  };

  handleSubmit = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  render() {
    const { handleSubmit } = this;
    const { searchQuery } = this.state;

    return (
      <>
        <GlobalStyle />
        <Box as="main">
          <S.App>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery searchQuery={searchQuery} />
          </S.App>
        </Box>
      </>
    );
  }
}
