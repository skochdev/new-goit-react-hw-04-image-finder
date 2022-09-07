import React, { useState, useEffect, useRef } from 'react';
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

enum Status {
  PENDING,
  RESOLVED,
  ERROR,
  NOTFOUND,
}

interface Props {
  query: string;
}

// @ts-ignore Because of multiple return statements from state machine, TS thinks that there's no return at all
export const ImageGallery: React.FC<Props> = ({ query }) => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [searchResults, setSearchResults] = useState([] as Image[]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.RESOLVED);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [tags, setTags] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    // prevents from fetching images on mount.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // sets current query so we can react if the user commited a new search
    setCurrentQuery(query);
    (async () => {
      try {
        // If it is a new search request, we remove currently uploaded images
        if (currentQuery !== query) {
          setSearchResults([]);
        }
        const data = await API.fetchImages(query, page);

        // if nothing's found, we stop populating the rest of the state, rendering placeholder image
        if (data.totalHits === 0) {
          setStatus(Status.NOTFOUND);
          return;
        }
        setSearchResults(prev => [...prev, ...data.hits]);
        setTotal(data.totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        console.log(error);
        setStatus(Status.ERROR);
        setError(
          error instanceof Error
            ? error.message
            : 'Error fetching search request'
        );
      }
    })();
  }, [query, page]);

  const imgClickHandler = (largeImageURL: string, tags: string) => {
    setModalImage(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === Status.RESOLVED) {
    return (
      <>
        {showModal && (
          <Modal
            modalImage={modalImage}
            tags={tags}
            onCloseModal={toggleModal}
          />
        )}
        {searchResults.length > 0 && (
          <S.ImageGallery>
            {searchResults.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                webformatURL={webformatURL}
                alt={tags}
                key={id}
                onImgClick={() => imgClickHandler(largeImageURL, tags)}
              />
            ))}
          </S.ImageGallery>
        )}

        {searchResults.length < total && (
          <LoadMoreButton onLoadMore={loadMoreHandler} />
        )}
      </>
    );
  }

  if (status === Status.PENDING) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (status === Status.ERROR) {
    return <p>{!error}</p>;
  }

  if (status === Status.NOTFOUND) {
    return <S.NotFound src={notFound} alt="nothing was found" />;
  }
};
