import React, { Component } from "react";

import Header from "./components/Header";
import ChangeableBackground from "./components/ChangeableBackground";
import ItemsContainer from "./containers/ItemsContainer";
import ItemAddContainer from "./containers/ItemAddContainer";
import Footer from "./components/Footer";
import NET_CONFIG from "./paths";

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      images: [],
      backgroundChange: ""
    };
    this.handleHover = this.handleHover.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      console.log("true");
      forceUpdate();
      console.log(prevProps.match.url, this.props.match.url);
      return true;
    }
    console.log("false");
    return false;
  }
  componentDidMount() {
    const url = this.props.match.url;
    console.log(url);
    console.log(
      "this.props.match.params.category",
      this.props.match.params.category
    );

    console.log("this.props.match", this.props.match);
    if (url === NET_CONFIG.root_dir) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("data", data);
          if (data.gallery[0].image[0].fullpath !== null) {
            this.setState({
              categories: data.gallery,
              backgroundChange:
                NET_CONFIG.root_dir + data.gallery[0].image[0].fullpath
            });
          }
        })
        .catch(err => console.log("Something bad happened", err));
    } else if (this.props.match.params.category) {
      fetch(this.props.match.params.category)
        .then(res => res.json())
        .then(data => {
          console.log("data", data);
          if (data.gallery[0].image[0].fullpath !== null) {
            this.setState({
              images: data.gallery,
              backgroundChange:
                NET_CONFIG.root_dir + data.gallery[0].image[0].fullpath
            });
          }
        })
        .catch(err => console.log("Something bad happened", err));
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
    let images = this.state.images;
    if (
      images === undefined ||
      this.state.categories === undefined ||
      this.state.backgroundChange === undefined
    ) {
      return false;
    }
    let sliced = this.props.match.params.category;
    if (images.length === 0 && this.state.categories.length !== 0) {
      return (
        <div>
          <ChangeableBackground change={this.state.backgroundChange} />
          <Header subCategory={false} match={this.props} />
          <ItemsContainer
            description={false}
            data={this.state.categories}
            handleHover={this.handleHover}
            match={this.props.match}
          >
            <ItemAddContainer subCategory={true} handleHover={false} />
          </ItemsContainer>
          <Footer />
        </div>
      );
    } else if (!this.state.categories && !this.state.images) {
      return <ItemAddContainer subCategory={true} match={this.props.match} />;
    } else {
      return (
        <div>
          <ChangeableBackground change={this.state.backgroundChange} />
          <Header subCategory={true} sliced={sliced} match={this.props} />
          <ItemsContainer
            description={true}
            data={images}
            handleHover={this.handleHover}
            match={this.props.match}
          >
            <ItemAddContainer
              subCategory={false}
              data={this.state}
              handleHover={false}
            />
          </ItemsContainer>
          <Footer />
        </div>
      );
    }
  }
}

export default App;
