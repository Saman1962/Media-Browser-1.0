import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Icon from "../images/glyph-iconset-master/svg/si-glyph-picture.svg";

const EmptyCategory = props => {
  return (
    <Router key={props.idx} forceRefresh={true}>
      <div className="item col-3  text-uppercase  ">
        <Link className="d-block item__link" to={"/gallery/" + props.path}>
          <img
            className="item__add--category item__add--category-opacity"
            src={Icon}
            alt="kategória"
          />
          <h4 className="item__add--text">Nebola vložena fotka</h4>
        </Link>
      </div>
    </Router>
  );
};
export default EmptyCategory;
