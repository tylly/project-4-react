import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {useState, useRef} from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Box,
  Text,
  Button,
  Textarea,
  useDisclosure
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import LoadingChakra from './LoadingChakra'
import { errorCreatingDev, errorUpdatingDev } from './AutoDismissAlert/messages'
import { createDeveloper, updateDeveloper } from '../../api/developers'
//import { useDisclosure } from '@chakra-ui/react'
  
function DevForm({ user, type, msgAlert, dev, onClose }){
  const [updated, setUpdated] = useState(false)
  const [name, setName] = useState('')
  const [linkedin, setLinkedin ] = useState('')
  const [github, setGithub ] = useState('')
  const [portfolio, setPortfolio ] = useState('')
  const [ upload, setUpload ] = useState({})
  const [ loading, setLoading ] = useState(null)
  const navigate = useNavigate()
  const myUrl = useRef("")
  const triggerRefresh = () => setUpdated(prev => !prev)
    
  function handleSubmitCreate(event) {
    event.preventDefault()
    setLoading(true)
      const newDev = {
        name,
        linkedin,
        github,
        portfolio
      }
      createDeveloper(user, newDev)
        .then(() => {
          navigate('/developers')
        })
        .catch(err => {
          console.log(err)
          msgAlert({
            heading: 'Error',
            message: errorCreatingDev,
            variant: 'danger'
          })
          setLoading(false)
        })
        .then(() => setLoading(false))
        .catch(err => {
          console.log(err)
          msgAlert({
            heading: 'Error',
            message: errorCreatingDev,
            variant: 'danger'
          })
          setLoading(false)
        })
    }
  
    function handleSubmitEdit (e) {
      e.preventDefault()
      const editedFields = {
      name,
      linkedin,
      github,
      portfolio
      }
      updateDeveloper(user, dev._id, editedFields)
        .then(res => {
          onClose()
          triggerRefresh()
      })
      .catch(err => {
        console.log(err)
        msgAlert({
          heading: 'Error',
          message: errorUpdatingDev,
          variant: 'danger'
        })
      })
    }
    
    if (loading) {
    return <LoadingChakra/>
    }
  
  return (
    <>
      <Box bg="gray:50" p={3} rounded="md" w={64}>
        <Text
          fontSize='4xl'
          textAlign={"center"}
        >
          {type==="edit" ? "Edit Developer" : "Create Developer" }
        </Text>

        <form 
          onSubmit={type === "edit" ? handleSubmitEdit : handleSubmitCreate}
          id='createDev'
        >
          <FormControl>
            <FormLabel htmlFor="name" textAlign={"center"} fontSize="lg">
              Name
            </FormLabel>
            <Input 
              id="name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              defaultValue={type === "edit" ? `${dev.name}` : ""}
              required>
            </Input>
          </FormControl>

          <FormControl my="3">
            <FormLabel htmlFor="linkedin" textAlign={"center"} fontSize="lg">
              LinkedIn
            </FormLabel>
            <Input 
              id="linkedin"
              name="linkedin"
              type="text"
              onChange={(e) => setLinkedin(e.target.value)}
              defaultValue={type === "edit" ? `${dev.linkedin}` : ""}
              required>
            </Input>
          </FormControl>

          <FormControl my="3">
            <FormLabel htmlFor="github" textAlign={"center"} fontSize="lg">
              Github
            </FormLabel>
            <Input 
              id="github"
              name="github"
              type="text"
              onChange={(e) => setGithub(e.target.value)}
              defaultValue={type === "edit" ? `${dev.github}` : ""}
              required>
            </Input>
          </FormControl>

          <FormControl my="3">
            <FormLabel htmlFor="portfolio" textAlign={"center"} fontSize="lg">
              Portfolio
            </FormLabel>
            <Input 
              id="portfolio"
              name="portfolio"
              type="text"
              onChange={(e) => setPortfolio(e.target.value)}
              defaultValue={type === "edit" ? `${dev.portfolio}` : ""}
              required>
            </Input>
          </FormControl>
          
          <Button mt="5" type="submit" width="half" align='center' colorScheme="blue">{type === "edit" ? "edit" : "create"}</Button>
        </form>
      </Box> 
    </>
  )
}

export default DevForm


  
  
     
           
   