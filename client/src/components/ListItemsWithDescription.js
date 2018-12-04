import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import EmptyCategory from "./EmptyCategory";
import history from "./index";

const ListItemsWithDescription = props => {
  return (
    <div className="container">
      <main>
        <div className="row no-gutters align-items-start text-center">
          {props.data.map((item, idx) => {
            if (item.image !== undefined && item.image[0] !== undefined) {
              return (
                <Router key={idx} forceRefresh={true}>
                  <div
                    className="item col-3  text-uppercase "
                    data-id={idx}
                    onMouseEnter={props.handleHover}
                    onClick={props.handleClick}
                  >
                    <Link
                      className="d-block item__link"
                      to={process.env.PUBLIC_URL + "/gallery/" + item.name}
                    >
                      <figure>
                        <img
                          className="figure-img rounded"
                          src={
                            process.env.PUBLIC_URL +
                            "/gallery/" +
                            item.image[0].fullpath
                          }
                          alt=""
                        />
                        <figcaption className="figure-caption mt-2">
                          <h3 className="item__title">{item.name}</h3>
                          <p className="item__description pt-1 pt-lg-0 pt-sm-0 text-lowercase">
                            {props.itemDescription(item.image.length)}
                          </p>
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                </Router>
              );
            } else {
              return <EmptyCategory idx={idx} path={item.path} />;
            }
          })}
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default ListItemsWithDescription;
