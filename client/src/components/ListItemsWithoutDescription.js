import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Lightbox from "./Lightbox";

const ListItemsWithoutDescription = props => {
  const { photoIndex, match } = props;
  return (
    <Router forceRefresh={true}>
      <div className="container">
        <main>
          <div className="row no-gutters align-items-start text-center">
            {props.data.map(item => {
              return item.image.map((items, idx) => {
                return (
                  <div
                    key={idx}
                    className="item  item--picture col-3 text-uppercase"
                    data-id={props.idx}
                    onMouseOver={props.handleHover}
                  >
                    <Link
                      className="d-block item__link loading"
                      to={
                        process.env.PUBLIC_URL +
                        `${"/gallery/" + items.fullpath}`
                      }
                      onClick={e => {
                        props.handleOpen();
                        props.handleIdx(idx);
                      }}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `${"/gallery/" + items.fullpath}`
                        }
                        className="rounded mb-0 h-100  b-lazy"
                        alt={items.name}
                      />
                    </Link>
                  </div>
                );
              });
            })}
            {props.children}
          </div>
        </main>
        {props.isOpen && (
          <Lightbox
            match={match}
            mainSrc={props.data[0].image[photoIndex].fullpath}
            nextSrc={
              props.data[0].image[(photoIndex + 1) % props.data[0].image.length]
                .fullpath
            }
            prevSrc={
              props.data[0].image[
                (photoIndex + props.data[0].image.length - 1) %
                  props.data[0].image.length
              ].fullpath
            }
            onMovePrevRequest={props.onMovePrevRequest}
            onMoveNextRequest={props.onMoveNextRequest}
          />
        )}
      </div>
    </Router>
  );
};

export default ListItemsWithoutDescription;
