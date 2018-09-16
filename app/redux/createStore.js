import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ApolloClient from "apollo-boost";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  const persistor = persistStore(store);
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    request: operation => {
      const token = store.getState().user;
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `bearer ${token}`
          }
        });
      }
    }
  });
  return { store, persistor, client };
};
