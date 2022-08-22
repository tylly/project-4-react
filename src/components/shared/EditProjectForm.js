import { Form, Button, Container } from "react-bootstrap";
import "../../style.css";

const EditProjectForm = (props) => {
  const { project, handleChange, heading, handleSubmit } = props;

  console.log(project);
  const formStyle = {
    color: "white",
    textAlign: "center",
    position: "absolute",
    zIndex: "2",
  };

  return (
    <div className="row" id="destinationForm" style={formStyle}>
      <div className="col-md mx-auto mt-5">
        <h3 style={{ color: "white" }} id="destinationFormHeading">
          {heading}
        </h3>
        <Form className="cards" onSubmit={handleSubmit}>
          <Form.Control
            placeholder="Project name"
            name="name"
            id={project._id}
            value={project.name}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <Form.Control
            placeholder="Project description"
            name="description"
            id={project._id}
            value={project.description}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <Form.Control
            placeholder="Project deployment"
            name="deployment"
            id={project._id}
            value={project.deployment}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
          <Form.Control
            placeholder="Project font end repo"
            name="font_end_repo"
            id={project._id}
            value={project.font_end_repo}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />
                    <Form.Control
            placeholder="Project font end repo"
            name="font_end_repo"
            id={project._id}
            value={project.font_end_repo}
            onChange={handleChange}
            className="mt-2"
            style={{ textAlign: "center" }}
          />

          <Button type="submit" className="mt-3" size="sm">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProjectForm;
