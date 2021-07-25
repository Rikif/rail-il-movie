import React, { memo } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { history } from 'utils/history';
import { addNewMovie } from 'containers/MoviesListPage/actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';
import { makeSelectNewMovieIdError } from './selectors';
import AddMovieForm from '../../components/AddMovieForm';
import ErrorBoundary from '../../components/ErrorBoundary';

import { POP } from '../../common/consts';
import Header from '../../components/Header';

export function AddMoviePage({submitAddNewMovie, error}) {
  useInjectReducer({ key: 'addMoviePage', reducer });
  useInjectSaga({ key: 'addMoviePage', saga });

  if(history.action === POP){
    history.push(`/moviesList`);
  }
  else 
    return (
    <>
      <Header/>
      {error && <div className="error">
        <FormattedMessage {...messages.err} />
      </div>}
      <ErrorBoundary>
        <AddMovieForm
          parentCallback={submitAddNewMovie}
        />
      </ErrorBoundary>
    </>
    );
}
AddMoviePage.propTypes = {
  onLoadAddMovie: PropTypes.func,
  submitAddNewMovie: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
};
  

const mapStateToProps = createStructuredSelector({
  error: makeSelectNewMovieIdError()
});

function mapDispatchToProps(dispatch) {
  return {
    submitAddNewMovie: (newMovie) => dispatch(addNewMovie(newMovie)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddMoviePage);


