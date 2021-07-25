import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Button from 'react-bootstrap/Button';
import { history } from 'utils/history';
import MoviesGrid from '../../components/MoviesGrid';
import { loadMovies } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectMoviesList, makeSelectLoading, makeSelectError } from './selectors'
import messages from './messages';
import Header from '../../components/Header';
import './style.scss';


export function MoviesListPage({ moviesList, loading, error, onLoadMovies }) {
  const handleCreate = () => {
    history.push('/create');
  }
  useInjectReducer({ key: 'moviesListPage', reducer });
  useInjectSaga({ key: 'moviesListPage', saga });

  useEffect(() => {
    if (!moviesList || moviesList.length === 0) onLoadMovies();
  }, []);

  return(
    <div className="warpper">
      <Header/>
      <Button variant="primary" onClick={handleCreate}>
        <FormattedMessage {...messages.create} />
      </Button>
      {loading && <div className="loading">
        <FormattedMessage {...messages.loading} />
      </div>}
      {error && <div className="error"><FormattedMessage {...messages.error} /></div>}
      <MoviesGrid list={moviesList} />
    </div>
  )
}

MoviesListPage.propTypes = {
  moviesList: PropTypes.array,
  onLoadMovies: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  moviesList: makeSelectMoviesList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadMovies: () => dispatch(loadMovies()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MoviesListPage);
