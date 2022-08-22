import { useState } from "react";
import { Form, Button, Container, DropdownButton, FormLabel, Input } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
// import axios from "axios";
import '../../style.css'
import { createUrl } from "../../api/aws";


const ProjectForm = ({ project, heading, handleChange, handleSubmit, handleChangeFile }) => {
  // const { project, heading, handleChange, handleSubmit, handleChangeFile } = props;

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
                
                <Form.Group 
                  controlId="formFileLg" 
                  className="mt-2">
                  <Form.Label>Image</Form.Label>
                  <Form.Control 
                    type="file" 
                    size="lg" 
                    style={{textAlign: 'center'}}
                    onChange={handleChangeFile}
                  />
                </Form.Group>
                
                {/* <Button onClick={handleUpload}>Upload</Button> */}
                <Button type="submit" className="mt-3" size="sm">Submit</Button>
              </Form>
          </div>
        </div>
  );
};

export default ProjectForm;


// import { Form, Button, Spinner } from 'react-bootstrap'


// const Home = ({ msgAlert }) => {
// 	const [ selected, setSelected ] = useState(null)
// 	const [ upload, setUpload ] = useState({})
// 	const [ loading, setLoading ] = useState(null)

// 	const handleChange = (e) => {
// 		e.preventDefault()
// 		setSelected(e.target.files[0])
// 	}

// 	const handleSubmit =(e) => {
// 		e.preventDefault()
// 		setLoading(true)
// 		const data = new FormData()
// 		data.append('upload', selected)
// 		axios({
// 			url: `${apiUrl}/uploads`,
// 			method: 'POST',
// 			//short for data: data
// 			data
// 		})
// 			.then(res => {
// 				setUpload(res.data.upload)
// 				msgAlert('Image upload success', 'success')
// 			})
// 			.then(() => setLoading(false))
// 			.catch(err => {
// 				msgAlert('Error uploading image', 'error')
// 			})
// 	}
// 	return (
// 		<>
			
// 			<h2>Home Page</h2>
// 			{upload.url ? ( <img className={'display-image'} alt={upload.url} src={upload.url}/> ) : '' }
// 			{loading ? (<Spinner animation="border" />) : ''}
// 			{/* form for file input */}
// 			<Form onSubmit={handleSubmit}>
// 			<Form.Group className="mb-3">
// 				<Form.Label>Default file input example</Form.Label>
// 				<Form.Control type="file" onChange={handleChangeFile} />
// 			</Form.Group>
// 			<Button type="submit" variant="outline-secondary">Secondary</Button>
// 			</Form>
// 		</>
// 	)
// }

// export default Home
