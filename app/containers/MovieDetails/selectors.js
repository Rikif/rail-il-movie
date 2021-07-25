import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMovie = state => state.movieDetailsSelector || initialState;

const makeSelectedMovieDetails = () =>
  createSelector(
    selectMovie,
    movieDetailsSelector => movieDetailsSelector.selectedMovie 
  );

const makeSelectLoading = () =>
  createSelector(
    selectMovie,
    movieDetailsSelector => movieDetailsSelector.loading,
  );
const makeSelectRated = () =>
  createSelector(
    selectMovie,
    movieDetailsSelector => movieDetailsSelector.selectedMovie.Rated,
  );
const makeSelectError = () =>
  createSelector(
    selectMovie,
    movieDetailsSelector => movieDetailsSelector.error,
  );

export{
  makeSelectedMovieDetails,
  makeSelectLoading,
  makeSelectError,
  makeSelectRated
};