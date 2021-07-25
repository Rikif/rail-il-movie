import produce from 'immer';
import {
  GET_CURRENT_MOVIE, GET_CURRENT_MOVIE_ERROR, GET_CURRENT_MOVIE_SUCCESS,
  RATING_CURRENT_MOVIE, RATING_CURRENT_MOVIE_ERROR, RATING_CURRENT_MOVIE_SUCCESS
} from './constants';
export const initialState = {
  currentMovie: {},
  loading: false,
  error:false

};

const getCurrentMoviePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_CURRENT_MOVIE:
        draft.selectedMovie = action.selectedMovie;
        draft.loading = false;
        draft.error = false;
        break;
      case RATING_CURRENT_MOVIE_SUCCESS:   
        draft.currentMovie = action.currentMovie;
        window.open("/moviesList", "_self");

        break;

      case GET_CURRENT_MOVIE_ERROR:
      case RATING_CURRENT_MOVIE_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      default:
        break;
    }
  });

export default getCurrentMoviePageReducer;
