import React, { Component } from 'react';
import * as S from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
// @ts-ignore
import notFound from '../../assets/notFound.webp';
import * as API from '../../api-service/api-service';
import { LoadMoreButton } from '../LoadMoreButton/LoadMoreButton';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';

type Image = {
  id: string;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};

interface State {
  searchResults: Image[];
  total: number;
  error: string | undefined | unknown;
  status: 'idle' | 'pending' | 'resolved' | 'error' | 'notFound';
  page: number;
  showModal: boolean;
  modalImage: string;
  tags: string;
}

interface Props {
  searchQuery: string;
}

export class ImageGallery extends Component<Props, State> {
  state: State = {
    searchResults: [],
    total: 0,
    error: '',
    status: 'idle',
    page: 1,
    showModal: false,
    modalImage: '',
    tags: '',
  };

  async componentDidMount() {
    try {
      const data = await API.fetchImages();
      this.setState({ searchResults: data.hits, total: data.totalHits });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    const { searchQuery } = this.props;
    let { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      const { totalHits, hits } = await API.fetchImages(searchQuery);

      try {
        this.setState({ status: 'pending' });
        if (totalHits > 0) {
          this.setState({
            searchResults: hits,
            total: totalHits,
            status: 'resolved',
          });
        } else if (hits.length === 0) {
          this.setState({ status: 'notFound' });
        }
      } catch (error) {
        console.log(error);
        this.setState({ error, status: 'error' });
      }
    }

    if (page !== prevState.page) {
      try {
        const data = await API.fetchImages(searchQuery, page);
        const { hits } = data;
        this.setState(prevState => ({
          searchResults: [...prevState.searchResults, ...hits],
        }));
      } catch (error) {
        console.log(error);
        this.setState({ error, status: 'error' });
      }
    }
  }

  imgClickHandler = (largeImageURL: string, tags: string) => {
    this.setState({
      modalImage: largeImageURL,
      tags,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    let { searchResults, status, error, modalImage, tags, total } = this.state;
    let { toggleModal, imgClickHandler, loadMoreHandler } = this;

    if (status === 'resolved') {
      return (
        <>
          {this.state.showModal && (
            <Modal
              modalImage={modalImage}
              tags={tags}
              onCloseModal={toggleModal}
            />
          )}
          {searchResults.length > 0 && (
            <S.ImageGallery>
              {searchResults.map(
                ({ id, webformatURL, largeImageURL, tags }) => (
                  <ImageGalleryItem
                    webformatURL={webformatURL}
                    alt={tags}
                    key={id}
                    onImgClick={() => imgClickHandler(largeImageURL, tags)}
                  />
                )
              )}
            </S.ImageGallery>
          )}

          {searchResults.length < total && (
            <LoadMoreButton onLoadMore={loadMoreHandler} />
          )}
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (status === 'error') {
      return <p>{!error}</p>;
    }

    if (status === 'notFound') {
      return <S.NotFound src={notFound} alt="nothing was found" />;
    }
  }
}
