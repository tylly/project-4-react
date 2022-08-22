import { useState, useRef } from "react";
import { Form, Button, Container, DropdownButton, FormLabel, Input } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import Dropdown from "react-bootstrap/Dropdown";
// import axios from "axios";
import '../../style.css'
import { createUrl } from "../../api/aws";
import { createProject } from '../../api/projects'
import { getOneDevByName } from "../../api/developers";
import { createProjectSuccess, createProjectFailure, errorUploadingImage, errorFindingDev } from '../shared/AutoDismissAlert/messages'



const ProjectForm = ({heading, user, msgAlert}) => {
  
//   const [image, setImage] = useState({ preview: "", raw: "" });
//   const [value, setValue] = useState("React");

//   const handleSelect = (e) => {
//     console.log(e);
//     setValue(e);
//   };

  const formStyle ={
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    zIndex: '2',
    width: '45%',
    marginLeft: '30%'
  }

  const [file, setFile] = useState()
  const [ loading, setLoading ] = useState(null)
  const navigate = useNavigate()

  const myUrl = useRef("")
  const [project, setProject] = useState({
      name: '',
      description: '',
      tags: [],
      deployment: '',
      img: '',
      front_end_repo: '',
      back_end_repo: '',
      developers: []
  })

  console.log('WHAT AM I EVEN DOING HERE?!',project)

  function handleChangeFile(event) {
    console.log('IM AM IN THE FILE UPLOAD FUNCTION')
    setFile(event.target.files[0])

  }

  function handleChange(e) {
    let dev = null
    setProject(prevProject => {
        //let updatedValue = null
        let updatedValue = e.target.value
        updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
        const updatedName = e.target.name

        //console.log('this is the input type', e.target.type)
        if (updatedName === 'developers') {
          
          getOneDevByName(updatedValue)
            .then(res => {
              console.log('RES.DATA from getOneDevByName', res.data.developer)
              updatedValue = res.data.developer._id
              console.log('THIS IS updatedValue IN GETONEDEV======>>>\n', updatedValue)
            })
            .catch(err => {
              console.log(err)
              msgAlert({
                heading: 'Error',
                message: errorFindingDev,
                variant: 'danger'
              })
            })
          
        }// else {
        //   updatedValue = e.target.value
        //   updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
        // }

        const updatedProject = {
            [updatedName]: updatedValue
        }
        return {
            ...prevProject,
            ...updatedProject
        }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    // If this is acting out comment out from here====>>>>
    console.log('IN THE HANDLE SUBMIT BEFORE FORMDATA')
    const data = new FormData()
    data.append('upload', file)
    setLoading(true)
    createUrl(data)
      .then(res => {
        console.log('FIRST THEN IN CREATE URL=====================', project)
        myUrl.current = res.data.upload.url
        const image = myUrl.current
        console.log('THIS IS IMAGE===========>>>\n', image)
        
        const newProject = {
          ...project,
          img: image
        }

        console.log('ARE WE THERE YET', newProject)
        
        createProject(user, newProject)
          .then(res => {
            console.log('FIRST THEN IN CREATE PROJECT================', project, "RES FROM CREATE\N", res)
            navigate(`/projects/${res.data.project._id}`)})
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: createProjectSuccess,
              variant: "success",
            })
          )
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: createProjectFailure,
              variant: "danger",
            })
          );
      })
      .then(() => setLoading(true))
      .catch(err => {
        console.log(err)
        msgAlert({
          heading: "Error",
          message: errorUploadingImage,
          variant: "danger",
        })
      })
  }
  console.log(project)

  return (
      <div className='row'id='projectForm'style={formStyle}>
          <div className='col-sm col-md col-lg col-xl mx-auto mt-5' >
            <h3 style={{color: 'white'}} id="projectFormHeading">{heading}</h3>
              <Form className="cards" onSubmit={handleSubmit}>
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

export default ProjectForm
