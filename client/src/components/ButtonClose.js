import React from "react";
import { Link } from "react-router-dom";

import Icon from "../images/close-icon.svg";

const classes = type => {
  switch (type) {
    case "category":
      return "position-relative btn__close cat";
    case "photo":
      return "position-relative btn__close photo";
    default:
      return "position-relative btn__close";
  }
};

const ButtonClose = props => {
  return (
    <button type="button" className={classes(props.type)} aria-label="Close">
      <Link to={{ pathname: "/gallery" }} className="d-flex">
        <img src={Icon} className="w-50 mr-3" alt="Close" />
        <span className="text-uppercase btn__close--text" aria-hidden="true">
          Zavrieť
        </span>
      </Link>
    </button>
  );
};

export default ButtonClose;
