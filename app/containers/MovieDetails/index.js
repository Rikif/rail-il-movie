import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import ReactStarsRating from 'react-awesome-stars-rating';
import { history } from 'utils/history';
import { FormattedMessage } from 'react-intl';
import { makeSelectMoviesList } from 'containers/MoviesListPage/selectors'
import reducer from './reducer';
import saga from './saga';
import { setSelectedMovieAction, ratingCurrentMovie } from './actions';
import { makeSelectedMovieDetails, makeSelectError, makeSelectLoading } from './selectors';
import './style.scss';
import messages from './messages';
import Header from '../../components/Header';

export function DetailsMoviePage(props) {

  useInjectReducer({ key: 'movieDetailsSelector', reducer });
  useInjectSaga({ key: 'movieDetailsSelector', saga });

  const { moviesList, setSelectedMovie, selectedMovie = {}, match: {params: {id}}} = props;

  const onChange = (value) => {
    selectedMovie.Rated = value;
    props.onRatingCurrentMovie(selectedMovie);
  };
  
  const ReactStars = () => <ReactStarsRating onChange={onChange} value={selectedMovie.Rated} isHalf={false} />;
  useEffect(() => {
    const currentMovie = moviesList.find((movie) => movie.imdbID === id) || {};
    setSelectedMovie(currentMovie);
  },[]);

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  }
  
  return (
    <>
      <Header/>
      {selectedMovie.imdbID !== 0 &&

        <div className="warpperDetails">
          <Button variant="primary" onClick={handleEdit}>
            <FormattedMessage {...messages.edit} />
          </Button>
          <Card >
            <Card.Img variant="top" src={selectedMovie.Poster} fluid="true" />
            <Card.Body>
              <ReactStars  />
              <Card.Text>
                {selectedMovie.Year}
              </Card.Text>
              <Card.Title>
                {selectedMovie.Title}
              </Card.Title>
              <Card.Text>
                {selectedMovie.Plot}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

      }
    </>
  );
}
DetailsMoviePage.propTypes = {
  setSelectedMovie: PropTypes.any,
  submitEditCurrentMovie: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  id: PropTypes.number,
  onRatingCurrentMovie:PropTypes.any,
  rated:PropTypes.any,
  selectedMovie: PropTypes.object,
  match: PropTypes.object,
  moviesList: PropTypes.array
};


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  selectedMovie: makeSelectedMovieDetails(),
  moviesList: makeSelectMoviesList(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedMovie: (selectedMovie) => dispatch(setSelectedMovieAction(selectedMovie)),
    onRatingCurrentMovie: (currentMovie) => dispatch(ratingCurrentMovie(currentMovie))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DetailsMoviePage);


