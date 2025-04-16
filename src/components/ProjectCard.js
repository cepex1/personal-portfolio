import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, inProgress, url }) => {
  const content = (
    <div className="proj-imgbx">
      <img src={imgUrl} alt={title} />
      <div className={`proj-overlay ${inProgress ? "" : "completed"}`}>
        {inProgress ? "Work in Progress" : "Completed"}
      </div>
      <div className="proj-txtx">
        <h4>{title}</h4>
        <span>{description}</span>
      </div>
    </div>
  );

  return (
    <Col sm={6} md={4}>
      {url && !inProgress ? (
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          {content}
        </a>
      ) : (
        content
      )}
    </Col>
  );
};
