import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { makeSelectMoviesList } from 'containers/MoviesListPage/selectors';
import { editMovie } from 'containers/MoviesListPage/actions';

import { makeSelectedMovieDetails } from 'containers/MovieDetails/selectors';
import { setSelectedMovieAction,  } from 'containers/MovieDetails/actions';

import reducer from './reducer';
import saga from './saga';

import { makeSelectCurrentMovieError } from './selectors';

import MovieForm from '../../components/AddMovieForm';
import ErrorBoundary from '../../components/ErrorBoundary';
import messages from './messages';
import Header from '../../components/Header';

export function EditMoviePage(props) {

  useInjectReducer({ key: 'editMoviePage', reducer });
  useInjectSaga({ key: 'editMoviePage', saga });

  const { 
    moviesList, 
    selectedMovie = {},
    setSelectedMovie, 
    submitEditCurrentMovie, 
    match: {params: {id}},
    error
  } = props;


  useEffect(() => {
    if (selectedMovie && id !== selectedMovie.imdbID){
      const currentMovie = moviesList.find((movie) => movie.imdbID === id);
      if(currentMovie) {
        setSelectedMovie(currentMovie);
      }
    }
      
  });

  return (
    <>
      <Header/>
      {error && <div className="error">
        <FormattedMessage {...messages.err} /></div>}
      <ErrorBoundary>
        {selectedMovie.imdbID !== 0 && <MovieForm
          selectedMovie={selectedMovie} parentCallback={submitEditCurrentMovie} />}
      </ErrorBoundary>
    </>
  );
}

EditMoviePage.propTypes = {
  setSelectedMovie: PropTypes.func,
  submitEditCurrentMovie: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  id: PropTypes.number,
  selectedMovie: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  match: PropTypes.object,
  moviesList: PropTypes.array,
};


const mapStateToProps = createStructuredSelector({
  error: makeSelectCurrentMovieError(),
  selectedMovie: makeSelectedMovieDetails(),
  moviesList: makeSelectMoviesList(),

});

function mapDispatchToProps(dispatch) {
  return {
    submitEditCurrentMovie: (newMovie) => dispatch(editMovie(newMovie)),
    setSelectedMovie: (selectedMovie) => dispatch(setSelectedMovieAction(selectedMovie)),
  };
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditMoviePage);


