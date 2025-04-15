import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  {NavBar } from './components/navBar';
import {Banner} from './components/Banner';
import {Skills} from './components/Skills';
import {Projects} from './components/Projects';
import {Contact} from './components/Contact';
import { Footer } from './components/Footer';
import React, {useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
