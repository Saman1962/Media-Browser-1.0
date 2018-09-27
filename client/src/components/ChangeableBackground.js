import React from 'react';

const ChangeableBackground = props => {
  const background = ['background'];
  background.push('show');

  return (
    <div className="header-background--edge-fix position-absolute">
      <div
        className="header-background"
        style={{backgroundImage: "url('" + props.change + "')"}}
      />
    </div>
  );
};
export default ChangeableBackground;
