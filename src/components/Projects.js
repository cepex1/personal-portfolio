import { Col, Container, Tab, Row, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";

export const Projects = () => { // Functional component definition
  // Array of project objects to be displayed in the project section
  const projects = [
    {
      title: "Movies Homepage",
      description: "React JS & CSS",
      imgUrl: projImg1,
      inProgress: true, // Flag to indicate if the project is in progress
    },
    {
      title: "Google gemini clone",
      description: "React & gemini API",
      imgUrl: projImg2,
      inProgress: true,
    },
  ];
  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col>
            <h2>Projects</h2>
            <p>
              Here, i will show my finishied projects and the ones that<br></br> i am currently working on.
            </p>
            <Tab.Container id="projects-tabs" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="nav-pills mb-5 justify-content-center align-items-center"
                id="pills-tab">
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab One</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab Two</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Tab Three</Nav.Link>
                </Nav.Item>
              </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row>
                  {projects.map((project, index) => {
                    return (
                      <ProjectCard
                        key={index}
                        {...project} // Spread operator to pass all properties of project object as props
                      /> 
                    );
                  })}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p>I am not working on any more projects right now... Come check it later!</p>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <p>I am not working on any more projects right now... Come check it later!</p>
              </Tab.Pane>
            </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
