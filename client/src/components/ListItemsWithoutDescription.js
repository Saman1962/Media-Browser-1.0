import React, { Component } from "react";
import { Link } from "react-router-dom";
import Lightbox from "./Lightbox";

class ListItemsWithoutDescription extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      console.log("robim refresh3");
      this.props.refresh();
    }
  }
  render() {
    const { photoIndex, match } = this.props;
    console.log("ListItems", this.props);
    return (
      <div className="container">
        <main>
          <div className="row no-gutters align-items-start text-center">
            {this.props.data.map(item => {
              return item.image.map((items, idx) => {
                return (
                  <div
                    key={idx}
                    className="item  item--picture col-3 text-uppercase"
                    data-id={this.props.idx}
                    onMouseOver={this.props.handleHover}
                  >
                    <Link
                      className="d-block item__link loading"
                      to={
                        process.env.PUBLIC_URL +
                        `${"/gallery/" + items.fullpath}`
                      }
                      onClick={e => {
                        this.props.handleOpen();
                        this.props.handleIdx(idx);
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
            {this.props.children}
          </div>
        </main>
        {this.props.isOpen && (
          <Lightbox
            match={match}
            mainSrc={this.props.data[0].image[photoIndex].fullpath}
            nextSrc={
              this.props.data[0].image[
                (photoIndex + 1) % this.props.data[0].image.length
              ].fullpath
            }
            prevSrc={
              this.props.data[0].image[
                (photoIndex + this.props.data[0].image.length - 1) %
                  this.props.data[0].image.length
              ].fullpath
            }
            onMovePrevRequest={this.props.onMovePrevRequest}
            onMoveNextRequest={this.props.onMoveNextRequest}
          />
        )}
      </div>
    );
  }
}

export default ListItemsWithoutDescription;
