import { getOneDeveloper, removeDeveloper } from "../../api/developers"
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from "../shared/LoadingChakra"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/hooks"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import DevForm from "../shared/DevForm"

const ShowDevelopers = ({ msgAlert, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const location = useLocation()
    console.log(location)
    const state = location.state
    const navigate = useNavigate()
    console.log('THIS IS THE STATE IN DEV SHOW PAGE=======>>', state)
    //console.log('I am the params in sho dev=======>>', dev._id)
    const [ developer, setDeveloper ] = useState(null)
    const [updated, setUpdated] = useState(false)
    const triggerRefresh = () => setUpdated((prev) => !prev)
    useEffect(() => {
        getOneDeveloper(state)
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

    return (
        <>
            <Card style={{ width: '30%', margin: 5, marginTop: 75}} key={ developer._id }>
                <Card.Header>{ developer.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>LinkedIn: { developer.linkedin }</small><br />
                        <small>Github: { developer.github }</small><br />
                        <small>Portfolio: { developer.portfolio }</small><br />
                        <hr/>
                        <small>Projects: { developer.projects }</small><br/>
                        <hr/>
                        <Link to={`/developers/`}>Back to index</Link>
                        {user ? 
                        <ButtonGroup>

                            <Button 
                                colorScheme='teal' 
                                size='sm'
                                onClick={onOpen}
                            >
                                Edit
                            </Button>
                            <Button 
                                colorScheme='teal' 
                                size='sm'
                                onClick={deleteDev}
                            
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                        :
                        ""
                        }
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DevForm
                            type='edit'
                            msgAlert={msgAlert} 
                            user={user}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            dev={developer}
                            onClose={onClose}
                        />
                    </ModalBody>
        
                    <ModalFooter>
                    
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
    
}

export default ShowDevelopers