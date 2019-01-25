import React from "react";
import { Link } from "react-router-dom";
import EmptyCategory from "./EmptyCategory";
const ListItemsWithDescription = props => {
  console.log("ListDesc", props);
  return (
    <div className="container">
      <main>
        <div className="row no-gutters align-items-start text-center">
          {props.data.map((item, idx) => {
            if (item.image !== undefined && item.image[0] !== undefined) {
              return (
                <div
                  className="item col-3  text-uppercase "
                  data-id={idx}
                  onMouseEnter={props.handleHover}
                  onClick={props.handleClick}
                >
                  <Link
                    className="d-block item__link"
                    to={{
                      pathname: props.match.url + "/" + item.name
                    }}
                  >
                    <figure>
                      <img
                        className="figure-img rounded"
                        src={"/gallery/" + item.image[0].fullpath}
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
              );
            } else {
              return <EmptyCategory idx={idx} category={item.name} />;
            }
          })}
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default ListItemsWithDescription;
