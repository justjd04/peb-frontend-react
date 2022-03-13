import { useState, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { sliderData } from "./sliderData";
import "./Slider.scss";
import { BsArrowRight } from "react-icons/bs";
// import { FcPrevious, FcNext } from "react-icons/fc";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion } from "framer-motion";

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
  // const slideLength = sliderData.length;
  const slideLength = slides.length;

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
      <MdNavigateBefore className="arrow prev" onClick={prevSlide} />
      <MdNavigateNext className="arrow next" onClick={nextSlide} />
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
                      <motion.span
                        whileInView={{ x: [-10, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <BsArrowRight className="arrow-btn" />
                      </motion.span>
                      <motion.span
                        whileInView={{ x: [-10, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="btn-text"
                      >
                        {slide.action}
                      </motion.span>
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
