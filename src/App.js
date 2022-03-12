import React from "react";

import { About, Footer, Header, People, Testimonial, Prc } from "./container";
import { Navbar } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Prc />
      <People />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
