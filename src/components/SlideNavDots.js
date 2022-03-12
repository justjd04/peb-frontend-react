import React from "react";

const SlideNavDots = ({ active }) => {
  return (
    <div className="app__slide-nav">
      {["home", "slide1"].map((item) => (
        <a
          href={`#${item}`}
          className="app__slide-nav-dot"
          style={active === item ? { backgroundColor: "#313BAC" } : {}}
        />
      ))}
    </div>
  );
};

export default SlideNavDots;
