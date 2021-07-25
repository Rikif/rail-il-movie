
import { LOAD_MOVIES, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR, ADD_NEW_MOVIE, EDIT_MOVIE } from './constants';

export function loadMovies() {
  return {
    type: LOAD_MOVIES,
  };
}

export function movieLoaded(moviesList) {
  return {
    type: LOAD_MOVIES_SUCCESS,
    moviesList,
  };
}

export function movieLoadingError(error) {
  return {
    type: LOAD_MOVIES_ERROR,
    error,
  };
}

export function addNewMovie(newMovie){
  return {
    type: ADD_NEW_MOVIE,   
    newMovie 
  };
};

export function editMovie(currentMovie){
  return {
    type: EDIT_MOVIE,   
    currentMovie 
  };
};