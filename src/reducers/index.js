import { put, delay, call, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

export const GET_NEWS = "GET_NEWS";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";
export const GET_NEWS_REMOVE = "GET_NEWS_REMOVE";

export const getNews = () => {
  return {
    type: GET_NEWS
  };
};
export const getNewsSuccess = data => {
  return {
    type: GET_NEWS_SUCCESS,
    data
  };
};
export const getNewsFailure = error => {
  return {
    type: GET_NEWS_FAILURE,
    error
  };
};
export const getNewsRemove = data => {
  return {
    type: GET_NEWS_REMOVE,
    data
  };
};

function getPostAPI() {
  return axios.get(`https://jsonplaceholder.typicode.com/users`);
}

function* fetchNews() {
  try {
    yield delay(3000);
    const response = yield call(getPostAPI);
    yield put(getNewsSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(getNewsFailure(e));
  }
}

function* fetchNewsRemove() {
  console.log("a");
  try {
    yield call(getNewsRemove([]));
  } catch (e) {
    console.error(e);
  }
}

function* actionWatcher() {
  yield takeLatest("GET_NEWS", fetchNews);
}
function* actionRemoveWatcher() {
  yield takeLatest("GET_NEWS_REMOVE", fetchNewsRemove);
}

export function* rootSaga() {
  yield all([actionWatcher(), actionRemoveWatcher()]);
}

const initialState = {
  loading: false,
  news: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEWS":
      return {
        ...state,
        loading: true
      };
    case "GET_NEWS_SUCCESS":
      return {
        ...state,
        news: action.data,
        loading: false
      };
    case "GET_NEWS_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case "GET_NEWS_REMOVE":
      return {
        ...state,
        news: [],
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
