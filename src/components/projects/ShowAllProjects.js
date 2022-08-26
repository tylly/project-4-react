import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";

import LoadingChakra from "../shared/LoadingChakra";
import { getAllProjects } from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Icon } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListItem
} from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Link as RouteLink }  from 'react-router-dom'
import DeveloperShowPreview from "../shared/DeveloperShow"
import ProjectCard from "./ProjectCard";
import '../../style.css'
// ShowAllProjects should make a request to the api
// To get all services
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
  marginTop: "100px",
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
};

const ProjectIndex = ({user, msgAlert}) => {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false)

  // const { msgAlert } = props;

  //console.log("Props in ShowAllProjects", props);

    useEffect(() => {
        console.log('happening shai!')
        getAllProjects()
            .then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.projects)
                setProjects(res.data.projects)})
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Projects',
                    message: messages.getProjectsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [updated])

    let handleChange = (e) => {
      let arr = projects.filter((i) => {
        if (e.target.value !== "" && i.tags[0].includes(e.target.value)){
          return i
        } 
        else if (e.target.value === "") {
          console.log("heyyyyyyy")
          getAllProjects()
            .then(res => {
                console.log(res)
                console.log(res.data)
                console.log(res.data.projects)
                setProjects(res.data.projects)})
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Projects',
                    message: messages.getProjectsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
        }
      })
      console.log("====================>", e.target.value === "", arr)
      setProjects(arr)
    }

    // If services haven't been loaded yet, show a loading message
    if (!projects) {
        return <LoadingChakra />
    } else if (projects.length === 0) {
        return <><p>No projects yet. Better add some.</p>
        <input onChange={handleChange} id="search" placeholder={"slime"} type={"text"}></input></>
    }

  if (error) {
    return <p>Error!</p>;
  }
  console.log("here are our projects!", projects);

//   if(!projects.tags){
//     <Badge>
//       There are no tags
//     </Badge>
//   }
// const tagSidebar = projects.tags.map((tag)=>(
      // <ListItem>
      //    <Badge borderRadius='full' px='2' colorScheme='red'>
      //     {tag}
      //   </Badge>
      // </ListItem>
// ))


  const projectCards = projects.map((project) => (

    <ProjectCard
      user={user}
      msgAlert={msgAlert}
      triggerRefresh={() => setUpdated(prev => !prev)}
      project={project}
    />
   

  ));

  return <div alt="boxContainer" style={cardContainerStyle}>
    <input onChange={handleChange} id="search" placeholder={'Search projects'} type={"text"}></input>
    {projectCards}</div>;
};

export default ProjectIndex;
