import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Prc.scss";

const Prc = () => {
  const [prc, setPrc] = useState([]);
  const [filterPrc, setFilterPrc] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "prc"]';

    client.fetch(query).then((data) => {
      setPrc(data);
      setFilterPrc(data);
    });
  }, []);

  const handlePrcFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterPrc(prc);
      } else {
        setFilterPrc(prc.filter((prc) => prc.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        <span>PRC Licensure Exam</span>
      </h2>

      <div className="app__work-filter">
        {["Chemical Engineering", "Mechanical Engineering", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handlePrcFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterPrc.map((prc, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(prc.imgUrl)} alt={prc.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={prc.link} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  ></motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{prc.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {prc.description}
              </p>
              <a href={prc.link} target="_blank" rel="noreferrer">
                Go to PRC website
              </a>

              {/* <div className="app__work-tag app__flex">
                <p className="p-text">{prc.tags[0]}</p>
              </div> */}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(MotionWrap(Prc, "app__works"), "prc", "app__primarybg");
