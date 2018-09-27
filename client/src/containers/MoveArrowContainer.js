import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Icon from "../images/prev-next_icon.svg";

const MoveArrowContainer = props => {
  return (
    <Router forceRefresh={false}>
      <div className="lightbox__btn-arrows__box position-absolute">
        <button
          type="button"
          className="lightbox__btn-arrows left"
          aria-label="Previous image"
        >
          <Link
            to={"/gallery/" + props.prevSrc}
            onClick={() => {
              props.onMovePrevRequest();
            }}
          >
            <img src={Icon} alt="Predchadzajuci obrázok" />
          </Link>
        </button>

        <button
          type="button"
          className="lightbox__btn-arrows right"
          aria-label="Next image"
        >
          <Link
            to={"/gallery/" + props.nextSrc}
            onClick={() => {
              props.onMoveNextRequest();
            }}
          >
            <img src={Icon} alt="Nasledujúci obrázok" />
          </Link>
        </button>
      </div>
    </Router>
  );
};

export default MoveArrowContainer;
