import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./People.scss";
import { urlFor, client } from "../../client";

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const query = '*[_type == "people"]';

    client.fetch(query).then((data) => {
      setPeople(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        <span>People</span>
      </h2>

      <div className="app__profiles">
        {people.map((people, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={people.title + index}
          >
            <img src={urlFor(people.imgUrl)} alt={people.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {people.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {people.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(People, "app__about"),
  "people",
  "app__whitebg"
);
