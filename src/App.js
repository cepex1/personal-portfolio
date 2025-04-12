// import linkedinIcon from "../assets/linkedin-icon.png";
// import logo from "./assets/img/logo.svg";
// import navIcon1 from "./assets/img/nav-icon1.svg";
// import navIcon2 from "./assets/img/nav-icon2.svg";
// import navIcon3 from "./assets/img/nav-icon3.svg";

import './App.css';
import  {NavBar } from './components/navBar';
import {Banner} from './components/Banner';
import {Skills} from './components/Skills';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills/>
    </div>
  );
}

export default App;
