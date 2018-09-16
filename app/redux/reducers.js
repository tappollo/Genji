import {featuredLanguages} from "../network/githubLanguages";
import {combineReducers} from 'redux';

const user = (state = null, action) => {
  if (action.type === "UPDATE_USER") {
    return action.payload;
  }
  return state;
};

const featured = (state = featuredLanguages, {type, payload}) => {
  if (type === 'TOGGLE_PIN') {
    if (state.includes(payload)) {
      return state.filter(a => a !== payload);
    } else {
      return [payload, ...state];
    }
  }
  return state;
};

const starred = (state = {}, {type, payload}) => {
  if (type === 'TOGGLE_STARRED') {
    return {
      ...state,
      [payload]: !state[payload]
    }
  }
  return state;
};

export default combineReducers({
  user,
  featured,
  starred,
});