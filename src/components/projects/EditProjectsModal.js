// import { Modal } from "react-bootstrap";
// import React, { useState } from "react";
// import EditProjectForm from "../shared/EditProjectForm";
// import { updateProject } from "../../api/projects";
// const EditProjectsModal = (props) => {
//   const [project, setProject] = useState(props.project);
//   const { user, show, handleClose, updateProject, msgAlert, triggerRefresh } =
//     props;

//   const handleChange = (e) => {
//     setProject((prevProject) => {
//       let updatedValue = e.target.value;
//       updatedValue =
//         updatedValue.charAt(0).toUpperCase() + updatedValue.slice(1);
//       const updatedName = e.target.name;
//       console.log(e.target.type);

//       const updatedProject = {
//         [updatedName]: updatedValue,
//       };
//       return {
//         ...prevProject,
//         ...updatedProject,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     updateProject(user, project) // why does this work??? We never pass the updated project?!
//       .then(() => handleClose())
//       .then(() =>
//         msgAlert({
//           heading: "oh yea!",
//           message: "success",
//           variant: "success",
//         })
//       )
//       .then(() => triggerRefresh())
//       .catch(() =>
//         msgAlert({
//           heading: "oh no!",
//           message: "failure",
//           variant: "danger",
//         })
//       );
//   };

//   return (
//     <>
//       {/* <Modal show={show} onHide={handleClose}
//       > */}
//         {/* <Modal.Header closeButton />
//         <Modal.Body> */}

//             {/* <ProjectForm 
//             project={project}
//             handleChange={handleChange}
//             // handleSubmit={handleSubmit}
//             heading="Update Destination"
//             /> */}

//         <EditProjectForm
//           show={show} 
//           onHide={handleClose}
//           project={project}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           heading="Update Project"
//         />

//         {/* </Modal.Body> */}
//       {/* </Modal> */}
//     </>
//   );
// };

// export default EditProjectsModal;
