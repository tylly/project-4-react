import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";

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
  ListItem
} from '@chakra-ui/react'
// like icon
import { StarIcon } from '@chakra-ui/icons'
import { Center } from '@chakra-ui/react'
import { Link as RouteLink }  from 'react-router-dom'
import DeveloperShowPreview from "../shared/DeveloperShow"
import { increaseLike, decreaseLike } from "../../api/like";

const ProjectCard = ({msgAlert, user, triggerRefresh, project}) => {
  const [commentToggle, setCommentToggle] = useState(false)
  const [like, setLike ] = useState(project.likes.length)
  
  //like color setup
  let myColor
    if (user) {
      if (project.likes.includes(user._id)) {
        myColor = 'teal.500'
      } else {
        myColor = 'gray.500'
      }
      }
    // handle like function  
    const addLike = () => {
      if (!project.likes.includes(user._id)) {
        increaseLike(user, project._id)
          .then(() => {
            myColor = 'teal.500'
            triggerRefresh()
            setLike(project.likes.length)
          })
          .catch(err => {
            msgAlert({
              heading: 'Error',
              message: messages.errorAddLike,
              variant: 'danger'
            })
            console.log(err)
          })
      } else {
        decreaseLike(user, project._id)
          .then(() => {
            myColor = 'gray.500'
            triggerRefresh()
            setLike(project.likes.length)
          })
          .catch(err => {
            msgAlert({
              heading: 'Error',
              message: messages.errorRemoveLike,
              variant: 'danger'
            })
            console.log(err)
          })
      }
    }
  return (
  <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' margin='20px' key={project._id} style={{zIndex: '1', color: 'white'}}>
      <RouteLink to={`/projects/${project._id}`}>
            <Image src={project.img} alt={project.name} />
            </RouteLink>

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='red'>
            {/* {tagSidebar} */}
          Tags go here
          </Badge>
          {/* like starts here */}
          <Box display='flex' mt='2' alignItems='center'>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {project.likes.length} Likes
            </Box>
            {user ? 
              // like icon
              <StarIcon
                ml="1" 
                alignSelf={"center"} 
                color={myColor} 
                onClick={() => addLike()}
              />
              :
              ""
            }
          </Box>

          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
            >
            <Link style={{color:'white'}} href={project.front_end_repo} isExternal>
              Front-End Repo<ExternalLinkIcon mx='2px' />
            </Link> &bull; <Link  style={{color:'white'}} href={project.back_end_repo} isExternal>
              Back-End Repo<ExternalLinkIcon mx='2px' />
            </Link>
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          marginBottom='10px'
          >
          {project.name}
        </Box>

          <Box  marginTop='10px'>
          <Accordion allowMultiple>
    
          <AccordionItem>
      <h2>
        {/* FOR THESE COLORS, LETS CHANGE TOMATO TO WHATEVER OUR THEME COLORS ARE */}
        <AccordionButton _expanded={{ bgGradient:'linear(to-l, #7928CA, #FF0080)', color: 'white' }}>
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
        <AccordionButton _expanded={{ bgGradient:'linear(to-l, #7928CA, #FF0080)', color: 'white' }}>
          <Box flex='1' textAlign='left'>
            Developers
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
            <DeveloperShowPreview
              devs={project.developers}
              msgAlert={msgAlert}
              />
              
      </AccordionPanel>
    </AccordionItem>
  </Accordion>

      <Center marginTop='10px'>
      <RouteLink to={`/projects/${project._id}`}>
        <Box as='button' borderRadius='md' bg='#00aeff' color='white' px={4} h={8} alignContent='center'>
          View Project
        </Box>
      </RouteLink>
      </Center>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectCard