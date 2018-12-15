import React from "react";
import Modal from "react-modal";
import ListItemsWithDescription from "../components/ListItemsWithDescription";
import ListItemsWithoutDescription from "../components/ListItemsWithoutDescription";
import ItemAddContainer from "./ItemAddContainer";

Modal.setAppElement("#root");

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: 0
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleIdx = this.handleIdx.bind(this);
  }
  handleIdx(idx) {
    this.setState({ photoIndex: idx });
  }
  handleOpen() {
    this.setState({ isOpen: true });
  }

  render() {
    const { handleHover, handleClick, match, data } = this.props;
    const { photoIndex, isOpen } = this.state;
    const itemDescription = num => {
      const item = Number.isInteger(num) ? num : "";
      switch (item) {
        case 1:
          return "1 fotka";

        case 2:
          return "2 fotky";

        default:
          return item + " fotiek";
      }
    };
    if (!this.props.description) {
      return (
        <div>
          <ListItemsWithDescription
            key={this.props.location.key}
            data={this.props.data}
            handleHover={handleHover}
            handleClick={handleClick}
            itemDescription={itemDescription}
          >
            <ItemAddContainer match={match} />
          </ListItemsWithDescription>
        </div>
      );
    } else {
      return (
        <ListItemsWithoutDescription
          key={this.props.location.key}
          match={match}
          data={data}
          handleHover={handleHover}
          handleClick={handleClick}
          handleIdx={this.handleIdx}
          handleOpen={this.handleOpen}
          photoIndex={photoIndex}
          isOpen={isOpen}
          onMovePrevRequest={() =>
            this.setState({
              photoIndex:
                (photoIndex + this.props.data[0].image.length - 1) %
                this.props.data[0].image.length
            })
          }
          onMoveNextRequest={() =>
            this.setState({
              photoIndex: (photoIndex + 1) % this.props.data[0].image.length
            })
          }
        >
          <ItemAddContainer subCategory={true} match={match} />
        </ListItemsWithoutDescription>
      );
    }
  }
}

export default ItemsContainer;
