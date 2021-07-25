import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddMoviePageDomain = state => state.addMoviePage || initialState;

const makeSelectAddMoviePage = () =>
  createSelector(
    selectAddMoviePageDomain,
    substate => substate,
  );

const makeSelectNewMovieIdError = () =>
  createSelector(
    selectAddMoviePageDomain,
    addMoviePage => addMoviePage.newMovie.error,
  );

const makeSelectCategoriesList= () =>
  createSelector(
    selectAddMoviePageDomain,
    addMoviePage => addMoviePage.newMovie.categoryList,
  );


export {
  makeSelectAddMoviePage,
  makeSelectNewMovieIdError,
  makeSelectCategoriesList
};
export { selectAddMoviePageDomain };

