import produce from 'immer';

import { LOAD_MOVIES, LOAD_MOVIES_SUCCESS, LOAD_MOVIES_ERROR, ADD_NEW_MOVIE, EDIT_MOVIE } from './constants';
import { ID_LEN, CHARS } from '../../common/consts';


export const initialState = {
  moviesList: [],
  loading: false,
  error: false,
};


const generateId = () => {
  let result = '';
  for (let i = ID_LEN; i > 0; i -=1) result += CHARS[Math.floor(Math.random() * CHARS.length)];
  return result;
}

const createMovie = (newMovie, moviesList) => {
  const imdbID = generateId()
  return [...moviesList, {...newMovie, imdbID}]; 
}

const editMovie = (currentMovie, moviesList) =>{
  const moviesToEdit = moviesList.filter((el) => el.imdbID !== currentMovie.imdbID); 
  return [...moviesToEdit, currentMovie]; 
}

const MoviesListReducer = (state = initialState, action) => 
  produce(state, ( draft ) => {
    switch (action.type) {

      case LOAD_MOVIES:
        draft.loading = true;
        draft.error = true;
        draft.moviesList = [];
        break;

      case LOAD_MOVIES_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.moviesList = action.moviesList;
        break;

      case LOAD_MOVIES_ERROR:
        draft.loading = false;
        draft.error = true;
        break;

      case ADD_NEW_MOVIE:
        draft.moviesList = createMovie(action.newMovie, state.moviesList);
        break;

      case EDIT_MOVIE:
        draft.moviesList = editMovie(action.currentMovie, state.moviesList);
        break;

      default:
        break;
    }
  });

export default MoviesListReducer;