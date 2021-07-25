import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';

import { ADD_NEW_MOVIE_SUCCESS } from './constants';
import {addNewMovieSuccess, addNewMovieError } from './actions';

const baseUrl = "/api";

export function* addNewMovie(action){

  const requestURL = `${baseUrl}/add`;
  const data = {
    Title: action.newMovie.Title,
    Year: action.newMovie.Year,
    Poster: action.newMovie.Poster,
    Director: action.newMovie.Director,
    Genre: action.newMovie.Genre,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  try{
    const newList = yield call(request, requestURL, options);
    yield put(addNewMovieSuccess(newList));
    
  }
  catch(err){
    addNewMovieError();
  
  }
}
export default function* getNewMovieIdSaga() {
  yield takeEvery (ADD_NEW_MOVIE_SUCCESS, addNewMovie);
}
