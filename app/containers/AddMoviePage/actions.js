import {
  ADD_NEW_MOVIE,
  ADD_NEW_MOVIE_SUCCESS, 
  ADD_NEW_MOVIE_ERROR,

} from './constants';


export function addNewMovie(newMovie){
  return {
    type: ADD_NEW_MOVIE,   
    newMovie 
  };
};

export function addNewMovieSuccess(newMovie){
  return {
    type: ADD_NEW_MOVIE_SUCCESS,   
    newMovie 
  };
};

export function addNewMovieError(){
  return {
    type: ADD_NEW_MOVIE_ERROR,
  };
};
