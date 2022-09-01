import React, { Component } from 'react';
import { Box } from '../utils/Box';
import { GlobalStyle } from '../global-styles/GlobalStyle';
import * as API from '../api-service/api-service';
import * as S from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

export interface Image {
  id: string;
  webformatURL: string;
  largeImageURL: string;
}

interface State {
  images: Image[];
  searchQuery: string;
}

export class App extends Component<{}, State> {
  state = {
    images: [],
    searchQuery: '',
  };

  async componentDidMount() {
    try {
      const images = await API.fetchImages();
      this.setState({ images: [...images.hits] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { images } = this.state;

    if (images.length > 0) {
      return (
        <>
          <GlobalStyle />
          <Box as="main">
            <S.App>
              <ImageGallery images={images} />
            </S.App>
          </Box>
        </>
      );
    }
  }
}
