import { Modal } from "react-bootstrap"
import React, { useState } from 'react'
import ProjectForm from "../shared/ProjectForm";
const EditProjectsModal = (props) => {
    const [project, setProject] = useState(props.project) 





    const handleChange = (e) => {
        setProject((prevProject) => {
          let updatedValue = e.target.value;
          updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
          const updatedName = e.target.name;
          console.log(e.target.type);

          const updatedProject = {
            [updatedName]: updatedValue,
          };
          return {
            ...prevProject,
            ...updatedProject,
          };
        });
      };

      
    return (
        <>
            <Modal //show={show} onHide={handleClose}
            >
        {/* <Modal.Header closeButton />
        <Modal.Body> */}
            <ProjectForm 
            project={project}
            handleChange={handleChange}
            //handleSubmit={handleSubmit}
            heading="Update Destination"
            />
        {/* </Modal.Body> */}
    </Modal>
        </>
    )
}

export default EditProjectsModal