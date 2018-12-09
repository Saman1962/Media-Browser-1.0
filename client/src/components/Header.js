import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import IconBack from "../images/category__icon-back.svg";

const Header = props => {
  props.updateMatch(props.match.url);
  if (!props.subCategory) {
    return (
      <div className="container ">
        <header className="header text-uppercase">
          <h1 className="header-text--big">Fotogaléria</h1>
          <nav className="nav mt-5">
            <h2 className="header-text--small">Kategórie</h2>
          </nav>
          <hr className="horizontal-line" />
        </header>
      </div>
    );
  } else {
    return (
      <div className="container">
        <header className="header text-uppercase">
          <h1 className="header-text--big">Fotogaléria</h1>
          <Router>
            <nav className="nav">
              <Link to="/gallery/" className="d-inline mt-5">
                <h2 className="header-text--small ">
                  <img className="mr-5" src={IconBack} alt="Dozadu" />
                  {props.sliced}
                </h2>
              </Link>
            </nav>
          </Router>
          <hr className="horizontal-line" />
        </header>
      </div>
    );
  }
};
/*Header.propTypes = {
                    arrow: PropTypes.bool,
            sliced: PropTypes.string
        };
Header.defaultProps = {
                    arrow: false
        };*/
export default Header;
