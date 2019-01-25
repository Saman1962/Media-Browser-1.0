import React from "react";
import Dropzone from "react-dropzone";

import PictureSymbol from "../images/glyph-iconset-master/svg/si-glyph-picture.svg";
import AddPhotoIcon from "../images/add-photo-icon.svg";

const PhotoForm = props => {
  let dropzoneRef;
  
  return (
    <form
      className="p-4 h-100 w-100"
      id="upload"
      action="/gallery/"
      encType="multipart/form-data"
    >
      <div className="form-group d-flex flex-column h-100 w-100  popup__text ">
        <label id="ImageAdd" htmlFor="ImageAdd" className="w-100">
          Pridať fotky
        </label>
        <Dropzone
          ref={node => {
            dropzoneRef = node;
          }}
          className={
            props.state.dropzoneActive ? "dropzone--active" : "dropzone"
          }
          onDrop={props.onDrop}
          onDragEnter={props.onDragEnter}
          onDragLeave={props.onDragLeave}
        >
          {props.state.files.map(i => (
            <img
              className="glyph-picture w-25 h-25"
              src={PictureSymbol}
              key={i.name}
              alt="vložená fotka"
            />
          ))}
          {props.state.files.length === 0 && (
            <div className="d-flex flex-column w-100 h-100 justify-content-center">
              <img className="plus__symbol" src={AddPhotoIcon} alt="" />
              <h4 className="item__title mx-auto dropzone__h4 mt-4">
                Sem presuňte fotky
              </h4>

              <p className="dropzone__p mx-auto text-lowercase">alebo</p>
              <button
                type="file"
                name="file"
                onClick={event => {
                  dropzoneRef.open();
                  event.preventDefault();
                  event.stopPropagation();
                }}
                className="dropzone__btn__choose dropzone__btn__choose--text mx-auto w-50 p-2 mt-3"
              >
                Vyberte súbory
              </button>
            </div>
          )}
        </Dropzone>
      </div>

      {props.children}
    </form>
  );
};

export default PhotoForm;
