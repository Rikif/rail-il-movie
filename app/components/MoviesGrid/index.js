import React from 'react';
import PropTypes from 'prop-types';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container'
import MovieCard from '../MovieCard/index';
import './style.scss';

export default function MoviesGrid({list}){
  return(
        <>
        <Container>
          <CardGroup>
            {list && list.map(movie=>
              <MovieCard 
                movie={movie}
                key={movie.imdbID}
              ></MovieCard>
            )}
          </CardGroup>
        </Container>
        </>
  )
}
MoviesGrid.propTypes = {
  list: PropTypes.array,
};
