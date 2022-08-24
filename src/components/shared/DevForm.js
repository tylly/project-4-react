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
  useDisclosure, 
  Center,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import LoadingChakra from './LoadingChakra'
import { errorCreatingDev } from './AutoDismissAlert/messages'
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
      msgAlert("Image upload error", "error")
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
    msgAlert("edit post error", "error")
  })
}

const editWidth = {
  width: '100%'
}

const createWidth = {
  width: '80%'
}

if (loading) {
return <LoadingChakra/>
}
  
  return (
    <>
    <Center>
      <Box bg="gray:50" p={3} rounded="md" w={64} textAlign={'center'} width={type === "edit" ? editWidth : createWidth}>
        <Text
          fontSize='3xl'
          textAlign={"center"}
          as='b'
          
        >
          {type==="edit" ? "Edit Developer" : "Create Developer" }
        </Text>

        <form 
          onSubmit={type === "edit" ? handleSubmitEdit : handleSubmitCreate}
          id='createDev'
        >
          <FormControl mt={3} my="3">
            <FormLabel htmlFor="name" textAlign={"left"} fontSize="lg">
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
          <FormLabel htmlFor="url" fontSize="lg">LinkedIn</FormLabel>
            <InputGroup>
              <Input
                id="linkedin"
                name="linkedin"
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                defaultValue={type === "edit" ? `${dev.linkedin}` : ""}
                required 
              />
            </InputGroup>
            </FormControl>
            <FormControl my="3">
          <FormLabel htmlFor="url" fontSize="lg">Github</FormLabel>
            <InputGroup>
              <Input
                id="github"
                name="github"
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                defaultValue={type === "edit" ? `${dev.github}` : ""}
                required 
              />
            </InputGroup>
          </FormControl>
          <FormControl my="3">
          <FormLabel htmlFor="url" fontSize="lg">Portfolio</FormLabel>
            <InputGroup>
              <Input
                id="portfolio"
                name="portfolio"
                type="text"
                onChange={(e) => setPortfolio(e.target.value)}
                defaultValue={type === "edit" ? `${dev.portfolio}` : ""}
                required
                />
            </InputGroup>
          </FormControl>
          <Stack direction='row' justifyContent={'right'} mt={7}>
          <Button size='sm' type="submit" width="half" align='center' colorScheme="whatsapp">{type === "edit" ? "Save" : "Create"}</Button>
          <Button  size='sm' colorScheme='twitter' onClick={onClose}>
                Cancel
          </Button>
          </Stack>
        </form>
      </Box> 
    </Center>
    </>
  )
}

export default DevForm


  
  
     
           
   