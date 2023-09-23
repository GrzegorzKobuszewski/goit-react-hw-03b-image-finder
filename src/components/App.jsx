import React from 'react';
import axios from 'axios';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './App.module.css';


const INITIAL_STATE = {
  images: [],
  error: '',
  page: 1,
  perPage: 12,
  isLoading: false,
  query: '',
  totalHits: '',
};

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29707791-ff65a0300987a99cb660f7261';


const getImages = async(searchValue, page, perPage) => {
  const response = await axios.get(`?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safeSearch=true&page=${page}&per_page=${perPage}`);
  return response.data;
}

export default class App extends React.Component {
  state = { ...INITIAL_STATE };

  handleRequest = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value;
    this.setState({ images: [], query: searchValue, page: 1 });
    e.target.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      try {
        const { query, page } = this.state;
        const fetchData = await getImages(query, page);
        if (!fetchData.total) {
          toast.error("Sorry, there's no such images", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        this.setState(({ images }) => ({
          images: [...images, ...fetchData.hits],
          totalHits: fetchData.total,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  componentRemoveListener() {
    window.removeEventListener('keydown', this.handleRequest);
  }

  render() {
    const { images, isLoading, totalHits, showModal } = this.state;

    return (
      <div className={style.App}>
        <SearchBar handleMakeRequest={this.handleRequest} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} imageOnClick={this.showModalImage} />
        )}

        {totalHits > images.length && (
          <Button handleMoreImage={this.loadMoreImages} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            modalImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
