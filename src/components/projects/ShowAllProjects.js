import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import LoadingChakra from "../shared/LoadingChakra";
import { getAllProjects } from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import ProjectCard from "./ProjectCard";
import "../../style.css";

const ProjectIndex = ({ user, msgAlert }) => {
  const [projects, setProjects] = useState(null);
  const [projectsReference, setProjectsReference] = useState(null);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [cardContainerStyle, setCardContainerStyle] = useState({
    marginTop: "100px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    display: "flex",
  });

  useEffect(() => {
    getAllProjects()
      .then((res) => {
        setProjects(res.data.projects);
        setProjectsReference(res.data.projects);
      })
      .catch((err) => {
        msgAlert({
          heading: "Error Getting Projects",
          message: messages.getProjectsFailure,
          variant: "danger",
        });
        setError(true);
      });
  }, [updated]);

  let handleChange = (e) => {
    let filteredProjects = projectsReference.filter((project) => {
      if (e.target.value !== "") {
        if (
          project.tags.find((tag) =>
            tag.includes(e.target.value.toLowerCase())
          ) ||
          project.developers.find((developer) =>
            developer.name.toLowerCase().includes(e.target.value.toLowerCase())
          ) ||
          project.name.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return project;
        }
      } else if (e.target.value.length === 0) {
        setProjects(projectsReference);
        setCardContainerStyle({
          marginTop: "100px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          display: "flex",
        });
      }
    });
    if (filteredProjects.length > 0) {
      setProjects(filteredProjects);
      setCardContainerStyle({
        marginTop: "100px",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        display: "flex",
      });
    } else if (e.target.value.length > 0 && filteredProjects.length === 0) {
      setCardContainerStyle({ display: "none" });
    }
  };

  // If services haven't been loaded yet, show a loading message
  if (!projects) {
    return <LoadingChakra />;
  } else if (projects.length === 0) {
    return (
      <>
        <p>No projects yet. Better add some.</p>
      </>
    );
  }

  if (error) {
    return <p>Error!</p>;
  }
  console.log("here are our projects!", projects);

  const projectCards = projects.map((project) => (
    <ProjectCard
      user={user}
      msgAlert={msgAlert}
      triggerRefresh={() => setUpdated((prev) => !prev)}
      project={project}
    />
  ));

  return (
    <>
      <input
        onChange={handleChange}
        id="search"
        placeholder={"Search project name, developers or tags"}
        type={"text"}
      ></input>
      <div alt="boxContainer" style={cardContainerStyle}>
        {projectCards}
      </div>
    </>
  );
};

export default ProjectIndex;
