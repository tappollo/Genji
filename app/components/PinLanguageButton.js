import React from "react";
import RoundButton from "./RoundButton";
import {connect} from "react-redux";

const PinLanguageButton = ({ language, featured, toggle }) => (
  <RoundButton
    onPress={() => toggle(language)}
    title={featured.includes(language) ? "Unpin" : "Pin"}
    selected={featured.includes(language)}
  />
);

export default connect(
  state => ({
    featured: state.featured
  }),
  dispatch => ({
    toggle: language => dispatch({ type: "TOGGLE_PIN", payload: language })
  })
)(PinLanguageButton);
