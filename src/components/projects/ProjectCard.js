import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
import '../../style.css'
import messages from "../shared/AutoDismissAlert/messages";
import { Box } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge } from '@chakra-ui/react'
import { Image, Text, Wrap, WrapItem } from '@chakra-ui/react'
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

    const tagSidebar = project.tags.map((tag)=>(
      <WrapItem>
          <Badge borderRadius='full' px='2' colorScheme='linkedin' variant='solid' mr='1'>
            {tag}
          </Badge>
      </WrapItem>
  ))
  //like color setup
  let myColor
    if (user) {
      if (project.likes.includes(user._id)) {
        myColor = 'red'
      } else {
        myColor = 'yellow'
      }
      }
    // handle like function  
    const addLike = () => {
      if (!project.likes.includes(user._id)) {
        increaseLike(user, project._id)
          .then(() => {
            myColor = 'white'
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
            myColor = 'white'
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
  <Box backgroundColor="rgba(255, 255, 255, 0.2)" maxW='250px' minW='330px' borderWidth='1px' borderRadius='lg' overflow='hidden' margin='20px' key={project._id} style={{zIndex: '1', color: 'white'}}>
     <Box display='flex' alignItems='center'>
            {user ? 
              // like icon
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/2250px-Love_Heart_symbol.svg.png"
                width='18px'
                height='18px'
                mt='2'
                ml='87%'
                mb='-7'
                onClick={() => addLike()}
              />
              :
              <Text mb='-7' ml='79%'>
                Likes:
              </Text>
            }
            <Box as='span' ml='2' mb='-7' color='white' fontSize='sm'>
            {project.likes.length} 
            </Box>
          </Box>
      <RouteLink to={`/projects/${project._id}`}>
            <Image id="projImg" src={project.img} alt={project.name} />
            </RouteLink>

      <Box p='6'>
        <Wrap display='flex' alignItems='baseline' >
            {tagSidebar}
            </Wrap>
          {/* like starts here */}
          {/* <Box
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
          </Box> */}
        
        
          {/* <Box display='flex' alignItems='center'>
            
            {user ? 
              // like icon
              <StarIcon
                ml="1" 
                alignSelf={"center"} 
                color={myColor} 
                onClick={() => addLike()}
                mt='2'
              />
              :
              ""
            }
            <Box as='span' ml='2' mt='2'color='#00ff77' fontSize='sm'>
            {project.likes.length} 
            </Box>
          </Box> */}

          

        <Box
          mt='5'
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
        <Box as='button' borderRadius='md' bg='#9310ea' mt='3' color='white' px={4} h={8} alignContent='center'>
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