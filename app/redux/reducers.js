import {featuredLanguages} from "../network/githubLanguages";
const user = (state, action) => {
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
      return state.concat(payload);
    }
  }
};

combineReducer