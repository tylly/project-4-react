import { Form, Button, Container, DropdownButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import '../../style.css'

const ProjectForm = (props) => {
  const { project, handleChange, heading, handleSubmit } = props;

  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };

console.log(project)

  const formStyle ={
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    zIndex: '2'
  }

  return (
      <div className='row'id='projectForm'style={formStyle}>
          <div className='col-sm col-md col-lg col-xl mx-auto mt-5' >
            <h3 style={{color: 'white'}} id="projectFormHeading">{heading}</h3>
              <Form className="cards" onSubmit={handleSubmit}>
                <Form.Control
                    placeholder="Project name"
                    name="name"
                    id={project._id}
                    value={project.name}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                
                <DropdownButton onSelect={handleSelect} variant="info">
                    <Dropdown.Item eventKey="React">
                    React
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Python">Python</Dropdown.Item>
                    <Dropdown.Item eventKey="MongoDB">MongoDB</Dropdown.Item>
                    <Dropdown.Item eventKey="Express">
                    Express
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="JavaScript">JavaScript</Dropdown.Item>
                    <Dropdown.Item eventKey="Node.js">Node.js</Dropdown.Item>
                    <Dropdown.Item eventKey="Django">
                    Django
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Vanilla JavaScript">
                    Vanilla JavaScript
                    </Dropdown.Item>
                </DropdownButton>
      
                <Form.Control
                    placeholder="Tags"
                    name="tag"
                    id={project._id}
                    value={project.tag}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                <Form.Control
                    placeholder="Description"
                    name="description"
                    id={project._id}
                    value={project.description}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                <Form.Control
                    placeholder="Front End Repo"
                    name="front_end_repo"
                    id={project._id}
                    value={project.frontendrepo}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                <Form.Control
                    placeholder="Back End Repo"
                    name="back_end_repo"
                    id={project._id}
                    value={project.backendrepo}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                <Form.Control
                    placeholder="Developers"
                    name="developers"
                    id={project._id}
                    value={project.developers}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                
                <Button type="submit" className="mt-3" size="sm">Submit</Button>
              </Form>
          </div>
        </div>
  );
};

export default ProjectForm;
