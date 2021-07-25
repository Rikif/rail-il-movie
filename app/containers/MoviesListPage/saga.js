import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_MOVIES } from './constants';
import { movieLoaded, movieLoadingError } from './actions';
import { API_URL } from '../../common/consts';

export function* getMovies() {
  try {
    const res = yield call(request, API_URL);
    yield put(movieLoaded([res]));
      
  } catch (err) {
    yield put(movieLoadingError(err));
  }
  
}
export default function* loadMoviesData() {
  yield (LOAD_MOVIES, getMovies());
}
