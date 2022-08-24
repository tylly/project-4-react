import { useState, useEffect } from "react"
import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import "../../style.css"

import { Container, Card } from "react-bootstrap"
// import { Link } from "react-router-dom"
import LoadingChakra from "../shared/LoadingChakra"
import {
  getOneProject,
  updateProject,
  removeProject,
} from "../../api/projects"
import messages from "../shared/AutoDismissAlert/messages"
import { Box, Image, Flex, Spacer, Badge, UnorderedList, ListItem, VStack, Link, Grid, GridItem, Button, WrapItem, Wrap, useDisclosure,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, 
  FormLabel,
  Stack,
  Input, 
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea, 
} from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons'
// We need to get the destination's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
  display: "flex",
  justifyContent: "center",
}

const ShowProject = ({ user, handleClose, msgAlert }) => {
  const [ project, setProject ] = useState(null)
  const [ updated, setUpdated ] = useState(false)
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ front_end_repo, setFront_end_repo ] = useState('')
  const [ back_end_repo, setBack_end_repo ] = useState('')
  const [ deployment, setDeployment ] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const triggerRefresh = () => setUpdated((prev) => !prev)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getOneProject(id)
      .then((res) => {
        setProject(res.data.project)
      })
      .catch((err) => {
        console.log(err)
        navigate("/")
        //navigate back to the home page if there's an error fetching
      })
  }, [updated])

  function handleSubmit (e) {
    e.preventDefault()
    
    const updatedProject = {
          name, 
          description, 
          deployment,
          front_end_repo,
          back_end_repo
    }

    updateProject(user, project._id, updatedProject)
      .then(() => {
        onClose()
        triggerRefresh()
      })
      .then(() => {
        msgAlert({
          heading: "Success!",
          message: messages.successEditProject,
          variant: "success",
        })
      })
      .catch(() => {
        msgAlert({
          heading: "oh no!",
          message: messages.errorUpdatingProject,
          variant: "danger",
        })
      })
  }

  const removeTheProject = () => {
    removeProject(user, project._id)
      // on success send a success message
      .then(() => {
        msgAlert({
          heading: "Success",
          message: messages.removeProjectSuccess,
          variant: "success",
        })
      })
      // then navigate to index
      .then(() => {
        navigate("/")
      })
      // on failure send a failure message
      .catch((err) => {
        msgAlert({
          heading: "Error removing project",
          message: messages.removeProjectFailure,
          variant: "danger",
        })
      })
  }

  if (!project) {
    return <LoadingChakra />
  }

  const developerSideBar = project.developers.map((developer)=>(
    <Box p='8' borderWidth='1px' pb='150%' marginTop='55px' >
          <h1 style={{textAlign: 'center', paddingBottom: '10px'}}><strong>Developers:</strong></h1>
          <UnorderedList listStyleType='none'>
            <ListItem>
              <Grid ml='-3'>
                <GridItem colStart={2} mr='-2'>
                  {/* Map through links */}
                  <Link href={developer.linkedin}><img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' width='20px' height='20px'></img></Link>
                </GridItem>
                <GridItem >
                  <Link href={developer.github}d-inline><img src='https://www.svgrepo.com/show/332401/github.svg' width='20px' height='20px'></img>
                  </Link>
                </GridItem>
                <GridItem colEnd={6} ml='-4'>
                  {/* {developer.name} map through */}
                  {developer.name}
                </GridItem>
              </Grid>
            </ListItem>
          </UnorderedList> 
          {user && project.owner === user._id ? (
            <Wrap direction='row' justify='right' p='2'>
              <WrapItem>
                <Button leftIcon={<AddIcon/>} colorScheme='orange' size='xs' onClick={() => removeTheProject()}>
                  Add Developer
                </Button>
              </WrapItem>
            </Wrap>
          ) : null}
        </Box>
  ))

  return (
    <Flex>
    <Box maxW='lg' maxH='80%' borderWidth='1px' borderRadius='lg' overflow='hidden' marginTop='80px'  marginLeft='25%' width='50%' >
      <Image src={project.img} />
      <Box p='3' >
        <Box display='flex' alignItems='baseline'>
          <Box
          mt='2'
          fontWeight='semibold'
          as='h1'
          lineHeight='tight'
          noOfLines={1}
          >
          {project.name}
          </Box>
        </Box>
          <Box
          mt='4'
          as='h1'
          lineHeight='tight'
          >
            Description: {project.description}
          </Box>
          <Box mt='2'>
          <Link href={project.deployment} isExternal  paddingRight='10px'>
            Deployment URL<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
          <Box  mt='2'>
          <Link href={project.front_end_repo} isExternal  paddingRight='10px'>
            Front-End Repo<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
          <Box  mt='2'>
          <Link href={project.back_end_repo} isExternal>
            Back-End Repo<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
      </Box>
      {user && project.owner === user._id ? (
        <Wrap direction='row' justify='right' p='2'>
          <WrapItem>
            <Button leftIcon={<DeleteIcon/>}colorScheme='red' size='xs' onClick={() => removeTheProject()}>
              Delete
            </Button>
          </WrapItem>
          <WrapItem>
              <Button leftIcon={<EditIcon />} colorScheme='linkedin' size='xs' onClick={onOpen}>
                Edit
              </Button>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                initialFocusRef={firstField}
                size='md'
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Edit Project</DrawerHeader>

                  <DrawerBody>
                  <Stack spacing='24px'>
                      <Box>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input 
                          id={project._id}
                          name="name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          defaultValue={project.name}
                          required
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='desc'>Description</FormLabel>
                        <Textarea
                            name="description"
                            id={project._id}
                            defaultValue={project.description}
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='url'>Deployment URL</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>http://</InputLeftAddon>
                          <Input
                            name="deployment"
                            id={project._id}
                            defaultValue={project.deployment}
                            onChange={(e) => setDeployment(e.target.value)}
                            type='url'
                            placeholder='Please enter domain'
                          />
                          <InputRightAddon>.com</InputRightAddon>
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='url'>Front-End Repo</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>http://</InputLeftAddon>
                          <Input
                            name="front_end_repo"
                            id={project._id}
                            defaultValue={project.front_end_repo}
                            onChange={(e) => setFront_end_repo(e.target.value)}
                            type='url'
                            placeholder='Please enter domain'
                          />
                          <InputRightAddon>.com</InputRightAddon>
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='url'>Back-End Repo</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>http://</InputLeftAddon>
                          <Input
                            name="back_end_repo"
                            id={project._id}
                            defaultValue={project.back_end_repo}
                            onChange={(e) => setBack_end_repo(e.target.value)}
                            type='url'
                            placeholder='Please enter domain'
                          />
                          <InputRightAddon>.com</InputRightAddon>
                        </InputGroup>
                      </Box>
                    </Stack>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} colorScheme='blue'>Save</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
          </WrapItem>
        </Wrap>
       ) : null}
    </Box>
    <Spacer />
    <VStack spacing={-.85} align='stretch' w='250px'>
        <Box p='8' borderWidth='1px' pb='100%' marginTop='55px' textAlign='center'>
          <h1><strong style={{ paddingBottom: '10px'}}>Tags:</strong> </h1>
          <UnorderedList listStyleType='none'textAlign='center'>
            <ListItem>
            {/* Will map through each tag*/}
            <Badge mr='5'>
            React
            {project.tags}
            </Badge>
            </ListItem>
          </UnorderedList>
        </Box>
        {/* {developerSideBar} */}
     </VStack>
     </Flex>
  )
}

export default ShowProject
