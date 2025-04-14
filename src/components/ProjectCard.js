import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, inProgress }) => {
  return (
    <Col sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt={title} />
        {inProgress && <div className="proj-overlay">Work in Progress</div>}
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
};
