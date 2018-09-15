import Stateful, { Onmount } from "./Stateful";
import React, { Fragment } from "react";
import { auth } from "react-native-firebase";

const FirebaseAuthGuard = ({ children, loading }) => (
  <Stateful>
    {({ state, setState, object }) => (
      <Fragment>
        <Onmount>
          {() => {
            object.unsubcribe = auth().onAuthStateChanged(() => {
              setState({ ready: true });
              object.unsubcribe && object.unsubcribe();
            });
          }}
        </Onmount>
        {state.ready && children}
      </Fragment>
    )}
  </Stateful>
);

export default FirebaseAuthGuard;
