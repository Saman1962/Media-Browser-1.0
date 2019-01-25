import React from "react";

const ChangeableBackground = props => {
  const background = ["background"];
  background.push("show");
  return (
    <div className="header-background--edge-fix position-absolute">
      <div
        className="header-background"
        style={
          props.change
            ? { backgroundImage: "url('" + props.change + "')" }
            : { backgroundColor: "black" }
        }
      />
    </div>
  );
};
export default ChangeableBackground;
