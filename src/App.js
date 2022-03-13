import React from "react";

import { About, Footer, Header, Stories, Testimonial, Prc } from "./container";
import { Navbar } from "./components";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Prc />
      <Stories />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
