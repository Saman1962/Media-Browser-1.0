import React from "react";
import NET_CONFIG from "../paths";
import ButtonClose from "../components/ButtonClose";
import PhotoForm from "../components/PhotoForm";
import ButtonSubmit from "../components/ButtonSubmit";

class PhotoAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropzoneActive: false,
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  onDrop(files) {
    let joined = this.state.files.concat(files);
    this.setState({
      files: joined
    });
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  handleUploadImage() {
    const category = this.props.match.params.category;
    let data = new FormData();
    this.state.files.map(file => {
      return data.append("files", file);
    });

    let url =
      NET_CONFIG.protocol +
      NET_CONFIG.hostname +
      NET_CONFIG.port +
      NET_CONFIG.root_dir +
      category;

    if (this.state.files.length > 0) {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: data
      }).catch(err => console.log("Something bad happened", err));
    } else {
      alert("Vyber obrazok pre pridanie");
    }
  }

  render() {
    const category = this.props.match.params.category;
    return (
      <div className="row  no-gutters  w-100 h-100 justify-content-center ">
        <div className="col-4 h-50 p-4 align-self-center popup  text-uppercase">
          <ButtonClose type="photo" />
          <PhotoForm
            state={this.state}
            onDrop={this.onDrop}
            onDragEnter={this.onDragEnter}
            onDragLeave={this.onDragLeave}
            handleUploadImage={this.handleUploadImage}
          >
            <ButtonSubmit
              handleUploadImage={this.handleUploadImage}
              category={category}
            />
          </PhotoForm>
        </div>
      </div>
    );
  }
}
export default PhotoAddContainer;
