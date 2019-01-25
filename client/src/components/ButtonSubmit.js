import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Icon from "../images/add-icon.svg";

const ButtonSubmit = props => {
  let classes = ["btn__add btn__add__text position-relative text-uppercase"];
  props.type === "category" ? classes.push("cat") : classes.push("photo");
  
  return (
    <Router forceRefresh={true}>
      <button type="submit" value="Submit" className={classes.join(" ")}>
        <Link
          to={"/gallery/" + props.category}
          onClick={e => {
            props.handleCategory
              ? props.handleCategory()
              : props.handleUploadImage();
          }}
          className="d-flex p-3"
        >
          <img src={Icon} className="mr-2" alt="Add" />
          Pridať
        </Link>
      </button>
    </Router>
  );
};

export default ButtonSubmit;
