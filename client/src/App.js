import React, { Component } from "react";

import Header from "./components/Header";
import ChangeableBackground from "./components/ChangeableBackground";
import ItemAddContainer from "./containers/ItemAddContainer";
import LoadItemsContainer from "./containers/LoadItemsContainer";
import Footer from "./components/Footer";
import NET_CONFIG from "./paths";
import { withRouter } from "react-router";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      images: [],
      backgroundChange: "",
      isFetching: false
    };
    this.handleHover = this.handleHover.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }
  componentDidMount() {
    const url = this.props.match.url;
    if (url === "/gallery") {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.gallery[0].image[0].fullpath !== null) {
            this.setState({
              categories: data.gallery,
              backgroundChange:
                NET_CONFIG.root_dir + data.gallery[0].image[0].fullpath,
              isFetching: true
            });
          }
        })
        .catch(err => console.log("Something bad happened", err));
    } else if (this.props.match.params.category) {
      fetch(
        
          this.props.match.params.category
      )
        .then(res => res.json())
        .then(data => {
          if (data.gallery[0].image[0].fullpath !== null) {
            this.setState({
              images: data.gallery,
              backgroundChange:
                NET_CONFIG.root_dir + data.gallery[0].image[0].fullpath,
              isFetching: true
            });
          }
        })
        .catch(err => {
          console.log("Something bad happened", err);
          this.setState({
            isFetching: true
          });
        });
    }
  }
  handleHover(e) {
    e.persist();
    let nameOfPicture;
    if (this.props.images === undefined) {
      if (e.target.getAttribute("src") !== null) {
        nameOfPicture = e.target.getAttribute("src");
      } else {
        return "";
      }
    } else {
      nameOfPicture = this.props.images[0].fullpath;
    }
    if (nameOfPicture !== undefined) {
      this.setState({
        backgroundChange: nameOfPicture
      });
    }
  }

  render() {
    const { images, isFetching } = this.state;
    let pathname = this.props.match.url;
    let sliced = pathname.split("/")[2];

    if (
      images.length === 0 &&
      this.state.categories.length !== 0 &&
      this.props.location.key !== undefined &&
      isFetching
    ) {
      return (
        <div>
          <ChangeableBackground change={this.state.backgroundChange} />
          <Header subCategory={false} />
          <LoadItemsContainer
            key={this.props.location.key}
            match={this.props.match}
            description={false}
            data={this.state.categories}
            handleHover={this.handleHover}
          >
            <ItemAddContainer
              subCategory={true}
              handleHover={false}
              match={this.props.match}
            />
          </LoadItemsContainer>

          <Footer />
        </div>
      );
    } else if (isFetching) {
      return (
        <div>
          <ChangeableBackground change={this.state.backgroundChange} />
          <Header subCategory={true} sliced={sliced} />

          <LoadItemsContainer
            key={this.props.location.key}
            match={this.props.match}
            description={true}
            data={images}
            handleHover={this.handleHover}
          >
            <ItemAddContainer
              subCategory={false}
              data={this.state}
              match={this.props.match}
              handleHover={false}
            />
          </LoadItemsContainer>

          <Footer />
        </div>
      );
    } else {
      return "";
    }
  }
}

export default withRouter(App);
