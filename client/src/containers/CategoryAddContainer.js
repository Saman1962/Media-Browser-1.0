import React from "react";
import NET_CONFIG from "../paths";

import ButtonClose from "../components/ButtonClose";
import ButtonSubmit from "../components/ButtonSubmit";
import CategoryForm from "../components/CategoryForm";

class CategoryAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }
  handleChange(e) {
    this.setState({ category: e.target.value });
  }
  handleCategory() {
    const name = this.state.category;
    if (name !== undefined) {
      fetch(
        NET_CONFIG.protocol +
          NET_CONFIG.hostname +
          NET_CONFIG.port +
          NET_CONFIG.root_dir,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: name })
        }
      ).catch(err => console.log("Something bad happened", err));
    } else {
      alert("Zadajte názov kategórie");
    }
  }

  render() {
    return (
      <div className="col-4  h-20 align-self-center popup  text-uppercase">
        <ButtonClose type="category"/>
        <CategoryForm onChange={this.handleChange} />
        <ButtonSubmit type="category" handleCategory={this.handleCategory} />
      </div>
    );
  }
}
export default CategoryAddContainer;
