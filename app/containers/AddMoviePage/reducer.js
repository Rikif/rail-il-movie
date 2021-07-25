import produce from 'immer';
import {
  DEFAULT_ACTION, ADD_NEW_MOVIE_ERROR, ADD_NEW_MOVIE
} from './constants';
export const initialState = {
  newMovie: {
    error: false  
  },
  
};

const addMoviesPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {

      case DEFAULT_ACTION:
        break;
      case ADD_NEW_MOVIE:
        draft.newMovie.error = false;
        draft.newMovie = action.newMovie;
        window.open("/moviesList", "_self");
        break;
      case ADD_NEW_MOVIE_ERROR:
        draft.newMovie.imdbID = 0;
        draft.newMovie.error = true;
        break;


      default:
        break;
    }
  });

export default addMoviesPageReducer;
