import React from 'react';
import HomePage from "./app/pages/HomePage";
import createStore from "./app/redux/createStore";
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from "react-redux";


const {store, persistor} = createStore();

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HomePage />
    </PersistGate>
  </Provider>
)
