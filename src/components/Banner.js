import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0); // State to keep track of the current index in the rotation
  const [isDeleting, setIsDeleting] = useState(false); // State to check if the text is being deleted
  const toRotate = ["Web Developer", "UI/UX Designer", "React Developer"]; //List of roles to rotate
  const [text, setText] = useState(""); // State to keep track of the current text being displayed
  const [delta, setDelta] = useState(300 - Math.random() * 100); // State to control the speed of the rotation
  const period = 2000; // Time period for the rotation effect

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta); // Usar delta para ajustar la velocidad

    return () => clearInterval(ticker);
  }, [loopNum, delta]); // Dependencias de loopNum y delta

  const tick = () => {
    // Function to handle the rotation effect
    let i = loopNum % toRotate.length; // Get the current index in the rotation (looping through the array)
    let fullText = toRotate[i]; // Get the full text for the current index
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1) // If deleting, remove one character from the end
      : fullText.substring(0, text.length + 1); // If adding, add one character to the text

    setText(updatedText); // Update the displayed text

    if (isDeleting) {
      // If the text is being deleted
      if (updatedText === "") {
        // If the text is fully deleted
        setIsDeleting(false); // Start adding text again
        setLoopNum(loopNum + 1); // Move to the next word in the rotation
      }
    } else if (updatedText === fullText) {
      // If the full text is displayed
      setIsDeleting(true); // Start deleting the text
    }
  };

  return (
    // JSX code to render the banner component
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to my Portfolio</span>
            <h1>
              {`Hi I'm Javier, `}
              <span className="wrap">{text}</span>
            </h1>
            <p>
              I'm a web developer with a passion for creating beautiful and
              functional websites. I have experience in HTML, CSS, JavaScript,
              and React.
            </p>
            <button onClick={() => console.log("connect")}>
              Let's Connect <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="header img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
