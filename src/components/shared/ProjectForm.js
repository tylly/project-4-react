import { useState } from "react";
import { Form, Button, Container, DropdownButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
// import axios from "axios";
import '../../style.css'

const ProjectForm = (props) => {
  const { project, heading, handleChange, handleSubmit } = props;

//   const [image, setImage] = useState({ preview: "", raw: "" });
//   const [value, setValue] = useState("React");

//   const handleSelect = (e) => {
//     console.log(e);
//     setValue(e);
//   };

console.log(project)

  const formStyle ={
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    zIndex: '2',
    width: '45%',
    marginLeft: '30%'
  }

// const handleChange = (e) => {
// setProject((prevProject) => {
//     let value = e.target.value;
//     const name = e.target.name;
//     console.log(value);
//     // console.log('this is the input type', e.target.type)

//     const updatedProject = {
//     [name]: value,
//     }
//     return {
//         ...prevProject,
//         ...updatedProject,
//     }
// })
// }

// const handleUpload = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image.raw);

//     await axios.get("YOUR_URL", {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       body: formData
//     });
//   };




  return (
      <div className='row'id='projectForm'style={formStyle}>
          <div className='col-sm col-md col-lg col-xl mx-auto mt-5' >
            <h3 style={{color: 'white'}} id="projectFormHeading">{heading}</h3>
              <Form className="cards" onSubmit={handleSubmit}>
                <h1 style={{color: 'black'}}> Upload project </h1>
                <br />
                <Form.Control
                    placeholder="Project name"
                    name="name"
                    id={project._id}
                    value={project.name}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                
                {/* <DropdownButton onSelect={handleSelect} variant="info">
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
                </DropdownButton> */}
      
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
                    value={project.front_end_repo}
                    onChange={handleChange}
                    className="mt-2"
                    style={{textAlign: 'center'}}
                />
                <Form.Control
                    placeholder="Back End Repo"
                    name="back_end_repo"
                    id={project._id}
                    value={project.back_end_repo}
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
                {/* <Button onClick={handleUpload}>Upload</Button> */}
                <Button type="submit" className="mt-3" size="sm">Submit</Button>
              </Form>
          </div>
        </div>
  );
};

export default ProjectForm;
