import { useState, useEffect } from "react";
// import { GrPrevious, GrNext } from "react-icons/gr";
import { sliderData } from "./sliderData";
import "./Slider.scss";
import { BsArrowRight } from "react-icons/bs";
import { FcPrevious, FcNext } from "react-icons/fc";

import { urlFor, client } from "../../client";

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const query = '*[_type == "slides"]';

    client.fetch(query).then((data) => {
      setSlides(data);
    });
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <FcPrevious className="arrow prev" onClick={prevSlide} />
      <FcNext className="arrow next" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div className="container">
                <img src={urlFor(slide.image)} alt="slide" className="image" />
                <div className="content">
                  <div className="slide-heading">{slide.heading}</div>
                  <div>{slide.desc}</div>
                  {/* <a href={slide.link} target="_blank" rel="noreferrer"> */}
                  <a href={slide.link}>
                    <div className="btn-container">
                      <span className="circle-btn" />
                      <BsArrowRight className="arrow-btn" />
                      <span className="btn-text">{slide.action}</span>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
