import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

const ROLES = ["Web Developer", "UI/UX Designer", "React Developer"];
const BASE_DELTA = 200;

export const Banner = () => {
  const [state, setState] = useState({
    loopNum: 0,
    isDeleting: false,
    text: "",
    delta: BASE_DELTA - Math.random() * 100
  });

  const { loopNum, isDeleting, text, delta } = state;

  useEffect(() => {
    const ticker = setInterval(tick, delta);
    return () => clearInterval(ticker);
  }, [text, isDeleting, loopNum, delta, tick]); // Added dependencies

  const tick = () => {
    const i = loopNum % ROLES.length;
    const fullText = ROLES[i];
    
    const updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setState(prev => ({...prev, text: updatedText}));

    if (!isDeleting && updatedText === fullText) {
      setTimeout(() => {
        setState(prev => ({...prev, isDeleting: true}));
      }, 1000); // Pausa antes de borrar
    } else if (isDeleting && updatedText === "") {
      setState(prev => ({
        ...prev,
        isDeleting: false,
        loopNum: loopNum + 1,
        delta: BASE_DELTA - Math.random() * 100
      }));
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
          <TrackVisibility>
          {({ isVisible }) =>
          <div className={isVisible ? "animate_animated animate_fadeIn" : ""}>
            <span className="tagline">Welcome to my Portfolio</span>
            <h1>
              {`Hi I'm Javier, `}
              <span className="wrap">{text || '\u00A0'}</span>
            </h1>
            <p>
              I'm a web developer with a passion for creating beautiful and
              functional websites. I have experience in HTML, CSS, JavaScript,
              and React.
            </p>
            <button onClick={() => console.log("connect")} aria-label="Connect">
              Let's Connect <ArrowRightCircle size={25} />
            </button>
            </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="Header illustration" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};