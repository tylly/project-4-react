// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

const signUpStyle = {
    color: 'white',
    textAlign: 'center', 
    marginTop: '20px'
}


const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}

    // function DrawerExample() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = React.useRef()
      
        // return (
        //   <>
        //     <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        //       Open
        //     </Button>
        //     <Drawer
        //       isOpen={isOpen}
        //       placement='right'
        //       onClose={onClose}
        //       finalFocusRef={btnRef}
        //     >
        //       <DrawerOverlay />
        //       <DrawerContent>
        //         <DrawerCloseButton />
        //         <DrawerHeader>Create your account</DrawerHeader>
      
        //         <DrawerBody>
        //           <Input placeholder='Type here...' />
        //         </DrawerBody>
      
        //         <DrawerFooter>
        //           <Button variant='outline' mr={3} onClick={onClose}>
        //             Cancel
        //           </Button>
        //           <Button colorScheme='blue'>Save</Button>
        //         </DrawerFooter>
        //       </DrawerContent>
        //     </Drawer>
        //   </>
        // )
    //   }

    return (
        <>
        <div className='row' id='sign-up'>
            <div className='col-sm col-md col-lg col-xl mx-auto mt-5'>
                <h3 style={signUpStyle}>Sign Up</h3>
                <Form onSubmit={onSignUp} style={signUpStyle}>
                    <Form.Group controlId='email'>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                            style={{textAlign: 'center'}}
                            className="mt-3"
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                            style={{textAlign: 'center'}}
                            className="mt-3"
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            style={{textAlign: 'center'}}
                            className="mt-3"
                        />
                    </Form.Group>
                    <Button variant="info" type='submit'className="mt-3" size="sm">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
        </>
    )

}

export default SignUp