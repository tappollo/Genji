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
  if (type === 'UPDATE_FROM_GRAPHQL') {
    const newState = {...state};
    payload.forEach(key => {
      if (newState[key] === undefined) {
        newState[key] = true;
      }
    });
    return newState;
  }
  return state;
};

export default combineReducers({
  user,
  featured,
  starred,
});