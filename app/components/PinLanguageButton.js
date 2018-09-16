import React from "react";
import RoundButton from "./RoundButton";
import { isLanguageFeatured } from "../network/githubLanguages";

const PinLanguageButton = ({ language }) => (
  <RoundButton
    title={isLanguageFeatured(language) ? "Unpin" : "Pin"}
    selected={isLanguageFeatured(language)}
  />
);

export default PinLanguageButton;
