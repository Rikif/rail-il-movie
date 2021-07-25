import React from 'react';
import Card from 'react-bootstrap/Card'
import PropTypes from 'prop-types';
import './style.scss';
import { history } from '../../utils/history';

export default function MovieCard({movie}) {
  const onMovieClick = () => {
    history.push(`/details/${movie.imdbID}`);
  }
  return (
        <>
            <Card onClick={onMovieClick}>
              {movie.Poster && <Card.Img variant="top" src={movie.Poster} thumbnail="true" />}
              <Card.Body>
                <Card.Title>
                  {movie.Title}
                </Card.Title>
                {movie.Plot && <Card.Text>
                  {movie.Plot}
                </Card.Text>}
              </Card.Body>
            </Card>
        </>
  )
}
MovieCard.propTypes = {
  movie: PropTypes.object
};
  