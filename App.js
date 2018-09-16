import React from "react";
import HomePage from "./app/pages/HomePage";
import createStore from "./app/redux/createStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import {ApolloProvider} from "react-apollo";

const { store, persistor, client } = createStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <HomePage />
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
