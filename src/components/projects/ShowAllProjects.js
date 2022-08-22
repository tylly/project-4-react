import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";

import LoadingScreen from '../shared/LoadingScreen'
import { getAllProjects } from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Link as RouteLink }  from 'react-router-dom'
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

const ProjectIndex = (props) => {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(false);

  const { msgAlert } = props;

  console.log("Props in ShowAllProjects", props);

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
    }, [])

    // If services haven't been loaded yet, show a loading message
    if (!projects) {
        return <LoadingScreen />
    } else if (projects.length === 0) {
        return <p>No services yet. Better add some.</p>
    }

  if (error) {
    return <p>Error!</p>;
  }
  console.log("here are our projects!", projects);

  const projectCards = projects.map((project) => (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' margin='20px'>
    <RouteLink to={`/projects/${project._id}`}>
          <Image src={project.img} alt={project.name} />
          </RouteLink>

    <Box p='6'>
      <Box display='flex' alignItems='baseline'>
        <Badge borderRadius='full' px='2' colorScheme='red'>
          New TAGS GO HERE
        </Badge>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'
        >
          <Link href={project.front_end_repo} isExternal>
            Front-End Repo<ExternalLinkIcon mx='2px' />
          </Link> &bull; <Link href={project.back_end_repo} isExternal>
            Back-End Repo<ExternalLinkIcon mx='2px' />
          </Link>
        </Box>
      </Box>

      <Box
        mt='1'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
      >
        {project.name}
      </Box>

        <Box>
        <Accordion allowMultiple>
  
        <AccordionItem>
    <h2>
      {/* FOR THESE COLORS, LETS CHANGE TOMATO TO WHATEVER OUR THEME COLORS ARE */}
      <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
        <Box flex='1' textAlign='left'>
          About
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
          {project.description}
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
        <Box flex='1' textAlign='left'>
          Developers
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {project.developers}
    </AccordionPanel>
  </AccordionItem>
</Accordion>

    <Center marginTop='10px'>
    <RouteLink to={`/projects/${project._id}`}>
      <Box as='button' borderRadius='md' bg='green' color='white' px={4} h={8} alignContent='center'>
        View Project
      </Box>
    </RouteLink>
    </Center>
      </Box>
    </Box>
  </Box>
  // </>
  ));

  return <div alt="boxContainer" style={cardContainerStyle}>{projectCards}</div>;
};

export default ProjectIndex;
