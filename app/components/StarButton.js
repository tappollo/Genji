import React from "react";
import RoundButton from "./RoundButton";
import {  connect } from "react-redux";
import Stateful from "../functionComponents/Stateful";
import {star, unstar} from "../network/githubAPI";
import githubOauth from "../network/githubOauth";

const StarButton = ({ starred, defaultValue, toggle, repo, auth, updateUser }) => {
  const starOn = starred[repo] === undefined ? defaultValue : starred[repo];
  return (
    <Stateful>{({state, setState}) => (
      <RoundButton
        loading={state.loading}
        title={starOn ? "Unstar" : "Star"}
        selected={starOn}
        onPress={async () => {
          try {
            let token = auth;
            if (!token) {
              const {access_token} = await githubOauth.start();
              updateUser(access_token);
              token = access_token;
            }
            setState({loading: true});
            if (starOn) {
              await unstar({repo, token})
            } else {
              await star({repo, token});
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
    updateUser: token => dispatch({type: "UPDATE_USER", payload: token}),
    toggle: repo => dispatch({ type: "TOGGLE_STARRED", payload: repo })
  })
)(StarButton);
