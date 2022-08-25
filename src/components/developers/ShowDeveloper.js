import { getOneDeveloper, removeDeveloper } from "../../api/developers"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Card } from "react-bootstrap"
// import { Link as RouterLink } from "react-router-dom"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from "../shared/LoadingChakra"
import { useDisclosure } from "@chakra-ui/hooks"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    Grid, 
    GridItem, 
    VStack,
    HStack,
    Image,
  } from '@chakra-ui/react'

  import { ArrowBackIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons'

import DevForm from "../shared/DevForm"
import ProjectForm from "../shared/ProjectForm"

const linkStyle = {
    textDecoration: 'none'
  }


const ShowDevelopers = ({ msgAlert, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation()
    console.log(location)
    const state = location.state
    const { id } = useParams();
    const navigate = useNavigate()
    console.log('THIS IS THE STATE IN DEV SHOW PAGE=======>>', state)
    //console.log('I am the params in sho dev=======>>', dev._id)
    const [ developer, setDeveloper ] = useState(null)
    const [updated, setUpdated] = useState(false)
    const triggerRefresh = () => setUpdated((prev) => !prev)
    useEffect(() => {
        getOneDeveloper(id)
            .then(res => {
                console.log('resdata in showdev========>>\n', res.data)
                setDeveloper(res.data.developer)
                console.log('developer//////////////////>>>\n', developer)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.errorShowingDevs,
                    variant: 'danger'
                })
            })
            
    }, [updated])

    const onModalClose = () => {
      onClose()
      triggerRefresh()
    }
    const deleteDev = () => {
        removeDeveloper(user, developer._id)
            .then(res => {
                triggerRefresh()
                navigate('/developers')
                msgAlert({
                    heading: 'Success',
                    message: messages.successDeletingDev,
                    variant: 'success'
                })
            })
            .catch(err => {
                console.log(err)
                msgAlert({
                    heading: 'Error',
                    message: messages.errorDeletingDev,
                    variant: 'danger'
                })
            })
    }
    if (!developer) {
        return (
            <LoadingChakra
                marginTop='100'
                align='center'
                justify='center'
            />
        )
    } 

    // const developerTag = project.tags.map((tags)=>(
        // <Badge
        //     px={2}
        //     py={1}
        //     fontWeight={'400'}>
        //     {project.tags}
        // </Badge>
    // ))

    return (
        <>
        <Center py={6}>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'xl'}
              src={
                'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
              }
              alt={'Avatar Alt'}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {developer.name}
            </Heading>
            <Link href={developer.portfolio} fontWeight={600} color={'gray.500'} mb={4}>
              {developer.portfolio}
            </Link>
            <Stack direction='row' mt={5} boxSize='50px'>
                <Image
                    boxSize='20px'
                    objectFit='cover'
                    src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
                    alt='Linked In'
                /><Link href={developer.linkedin} textAlign='left' boxSize={'250px'} fontSize={'15px'} style={linkStyle} isExternal>{developer.linkedin} </Link>
            </Stack>
            <Stack direction='row' mt={3} boxSize='50px'>
                <Image
                    boxSize='20px'
                    objectFit='cover'
                    src='https://www.svgrepo.com/show/332401/github.svg'
                    alt='Github'
                /><Link href={developer.github}textAlign='left' boxSize={'250px'} fontSize={'15px'} style={linkStyle} isExternal>{developer.github}</Link>
            </Stack>

            <Stack align={'center'} justify={'center'} direction={'row'} mt={3} >
              <Badge
                px={2}
                py={1}
                fontWeight={'400'}>
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
               
                fontWeight={'400'}>
                #photography
              </Badge>
              <Badge
                px={2}
                py={1}
                
                fontWeight={'400'}>
                #music
              </Badge>
            </Stack>
    
            <Stack mt={8} direction={'row'} spacing={2} mb={2}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                size='sm'
                colorScheme={'purple'}
                >
                Projects
              </Button>
              <Button
                rightIcon={<ArrowBackIcon/>}
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue'}
                size='sm'
                color={'white'}
                onClick={() => navigate(`/developers/`)}
               >
               Back
              </Button>
              { user ? (
              <>
                <Button
                  leftIcon={<EditIcon/>}
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'orange'}
                  size='sm'
                  color={'white'}
                  onClick={onOpen}
                >
                Edit
                </Button>
                <Button
                  leftIcon={<DeleteIcon/>}
                  flex={1}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'red'}
                  size='sm'
                  color={'white'}
                  onClick={deleteDev}
                >
                  Del
                </Button>
              </>
              )
              :
              ""
              }
            </Stack>
          </Box>
        </Center>

        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalBody textAlign={'center'}>
                <DevForm
                    type='edit'
                    msgAlert={msgAlert} 
                    user={user}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    dev={developer}
                    onClose={onClose}
                />
            </ModalBody>
        </ModalContent>
        </Modal>
        </>
      );


    // return (
    //     <>
    //         <Card style={{ width: '30%', margin: 5, marginTop: 75}} key={ developer._id }>
    //             <Card.Header>{ developer.name}</Card.Header>
    //             <Card.Body>
    //                 <Card.Text>
    //                     <small>LinkedIn: { developer.linkedin }</small><br />
    //                     <small>Github: { developer.github }</small><br />
    //                     <small>Portfolio: { developer.portfolio }</small><br />
    //                     <hr/>
    //                     <small>Projects: { developer.projects }</small><br/>
    //                     <hr/>
    //                     <Link to={`/developers/`}>Back to index</Link>
    //                     {user ? 
    //                     <ButtonGroup>

    //                         <Button 
    //                             colorScheme='teal' 
    //                             size='sm'
    //                             onClick={onOpen}
    //                         >
    //                             Edit
    //                         </Button>
    //                         <Button 
    //                             colorScheme='teal' 
    //                             size='sm'
    //                             onClick={deleteDev}
                            
    //                         >
    //                             Delete
    //                         </Button>
    //                     </ButtonGroup>
    //                     :
    //                     ""
    //                     }
    //                 </Card.Text>
    //             </Card.Body>
    //         </Card>

    //     </>
    // )
    
}

export default ShowDevelopers