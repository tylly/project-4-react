import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Text } from '@chakra-ui/layout'
import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const signInStyle = {
    color: "white",
    justifyContentCenter: 'center',
    textAlign: 'center',
    marginTop: '20px'
}

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/projects'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <>
        <div className='row'id='sign-in'>
            <div className='col-sm col-md col-lg col-xl mx-auto mt-5' >
                <h3 style={signInStyle}>Sign In</h3>
                <Form onSubmit={onSignIn} style={signInStyle}>
                    <Form.Group controlId='email'>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                            className="mt-3"
                            style={{textAlign: 'center'}}
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
                            className="mt-3"
                            style={{textAlign: 'center'}}
                        />
                    </Form.Group>
                    <Button variant="info" type='submit'className="mt-3" size="sm">
                        Submit
                    </Button>
                    <Link to={'/sign-up'}>
                    <Text textAlign={"center"} fontSize='xs'>
                        Don't have an account?     
                    </Text> 
                    </Link>
                </Form>
               
            </div>
        </div>
        </>
    )
}

export default SignIn
