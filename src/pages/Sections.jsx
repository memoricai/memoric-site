import React from "react";
import Home from "./Home";
import Courses from "./Courses";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";

export default function Sections() {
  return (
    <div className="w-full">
      <section id="home">
        <Home />
      </section>
      
      <section id="courses">
        <Courses />
      </section>
      
      <section id="services">
        <Services />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}