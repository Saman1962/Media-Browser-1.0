import React from "react";
import Modal from "react-modal";
import ItemAdd from "../components/ItemAdd";

Modal.setAppElement("#root");

class ItemAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    if (this.props.showModal === true) {
      this.setState({ showModal: true });
    }
  }
  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.props.match);
    if (!this.props.subCategory) {
      return (
        <ItemAdd
          text="Pridať kategóriu"
          state={this.state}
          openModal={this.openModal}
          type="category"
          match={this.props.match}
        />
      );
    } else {
      return (
        <ItemAdd
          text="Pridať fotku"
          state={this.state}
          openModal={this.openModal}
          type="photo"
          match={this.props.match}
        />
      );
    }
  }
}

export default ItemAddContainer;
