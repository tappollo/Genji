import React from "react";
import RoundButton from "./RoundButton";
import {  connect } from "react-redux";
import Stateful from "../functionComponents/Stateful";
import {star} from "../network/githubAPI";
import {withNavigation} from 'react-navigation';

const StarButton = ({ starred, defaultValue, toggle, repo, auth }) => {
  const starOn = starred[repo] === undefined ? defaultValue : starred[repo];
  return (
    <Stateful>{({state, setState}) => (
      <RoundButton
        loading={state.loading}
        title={starOn ? "Unstar" : "Star"}
        selected={starOn}
        onPress={async () => {
          try {
            setState({loading: true});
            if (starOn) {
              await unstar({repo, auth})
            } else {
              await star({repo, auth});
            }
            toggle(repo)
          } finally {
            setState({loading: false});
          }
        }}
      />
    )}</Stateful>
  );
};

export default connect(
  state => ({
    starred: state.starred,
    auth: state.user,
  }),
  dispatch => ({
    toggle: repo => dispatch({ type: "TOGGLE_STARRED", payload: repo })
  })
)(StarButton);
