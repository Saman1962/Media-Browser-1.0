import React from "react";
import Modal from "react-modal";
import { BrowserRouter as Router } from "react-router-dom";

import ButtonClose from "./ButtonClose";
import MoveArrowContainer from "../containers/MoveArrowContainer";

const Lightbox = props => {
  const {
    match,
    mainSrc,
    prevSrc,
    nextSrc,
    onMovePrevRequest,
    onMoveNextRequest
  } = props;

  return (
    <Router forceRefresh={false}>
      <Modal
        isOpen={true}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        contentLabel="Lightbox"
        overlayClassName="overlay"
        className="row no-gutters h-100 justify-content-center"
      >
        <div id="Lightbox" className="d-flex justify-content-center">
          <div className="lightbox col-8  mx-3 align-self-center   position-relative">
            <Router forceRefresh={true}>
              <ButtonClose match={match} />
            </Router>
            <img
              className="img-fluid w-100"
              src={"/gallery/" + mainSrc + "/"}
              alt="fotka"
            />
            {prevSrc !== nextSrc ? (
              <MoveArrowContainer
                prevSrc={prevSrc}
                nextSrc={nextSrc}
                onMovePrevRequest={onMovePrevRequest}
                onMoveNextRequest={onMoveNextRequest}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </Modal>
    </Router>
  );
};

export default Lightbox;
