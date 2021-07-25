import { put, takeEvery,select } from 'redux-saga/effects';

import { GET_CURRENT_MOVIE, RATING_CURRENT_MOVIE } from './constants';
import { getCurrentMovieSuccess, getCurrentMovieError, ratingCurrentMovieError,ratingCurrentMovieSuccess } from './actions';
import * as selectors from '../MoviesListPage/selectors';

export function* getCurrentMovie(action){
  const currentList = yield select(selectors.makeSelectMoviesList());
  if(currentList !== false){
    try{
      const current = _getItem(currentList,action.imdbID);
      yield put(getCurrentMovieSuccess(current));
    }
    catch(err){
      yield put(getCurrentMovieError(err));
    }
  }
};

export function* editCurrentMovie(action){
  const currentList = yield select(selectors.makeSelectMoviesList());
  if(currentList !== false){
    try{
      const newList = _updateItem(currentList,action.currentMovie);
      yield put(ratingCurrentMovieSuccess(newList));  
    }
    catch(err){
      yield put(ratingCurrentMovieError()); 
    }
  }
}
export default function* getNewMovieIdSaga() {
  yield takeEvery(GET_CURRENT_MOVIE, getCurrentMovie);
  yield takeEvery (RATING_CURRENT_MOVIE, editCurrentMovie);
}
const _getItem = (list, id) => {
  const currentItem = list.find(item => item.imdbID.toString() === id.toString());
  return currentItem;
};


const _updateItem = (list, updatedItem) => {
  const newList = [...list];
  const currentItemIndex = newList.findIndex(
    item => item.imdbID.toString() === updatedItem.imdbID.toString(),
  );
  newList[currentItemIndex] = updatedItem;
  return newList;
};
