import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from "react-modal";

import PhotoAddContainer from "../containers/PhotoAddContainer";
import CategoryAddContainer from "../containers/CategoryAddContainer";

import IconPhoto from "../images/add-photo-icon.svg";
import IconCategory from "../images/add-category-plus-symbol.svg";

const ItemAdd = props => {
  return (
    <div className="item col-3  text-uppercase mr-lg-3 mr-sm-5 offset-xl-1">
      <Router forceRefresh={false}>
        <Link
          className="d-block item__link"
          to={
            props.type === "photo" ? "/gallery/" + props.category : "/gallery/"
          }
          onClick={() => {
            props.openModal();
          }}
        >
          <img
            className="item__add--category"
            src={props.type === "photo" ? IconPhoto : IconCategory}
            alt=""
          />
          <h4 className="item__add--text">{props.text}</h4>
        </Link>
      </Router>

      <Modal
        isOpen={props.state.showModal}
        onLoad={props.openModal}
        ariaHideApp={true}
        contentLabel={props.text}
        overlayClassName="overlay"
        className="row  no-gutters  h-100 justify-content-center "
      >
        {props.type === "photo" && <PhotoAddContainer match={props.match} />}
        {props.type === "category" && <CategoryAddContainer />}
      </Modal>
    </div>
  );
};

export default ItemAdd;
