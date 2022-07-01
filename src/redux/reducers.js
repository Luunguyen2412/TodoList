import {GET_CITIES, SET_EMAIL, SET_PASSWORD} from './actions';

const initialState = {
  email: '',
  password: '',
  cities: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {...state, cities: action.payload};
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    default:
      return state;
  }
}

export default userReducer;
