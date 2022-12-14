import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const navStyle ={
	display: 'inline',
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to="/projects/create-project" style={linkStyle}>
			Add Project
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2 mt-2'style={navStyle}>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2 mt-2'style={navStyle}>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/projects' style={linkStyle}>
				Projects
			</Link>
		</Nav.Item>

		<Nav.Item className='m-2'>
			<Link to='/developers' style={linkStyle}>
				Developers
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar className='fixed-top' bg='black' variant='dark' expand='md' id='navbar'>
		<Navbar.Brand className='ms-2'>
            <Link to='/' style={linkStyle}>
                ProjectX
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse className='justify-content-end'id='basic-navbar-nav'>
			<Nav className='ml-auto ms-2'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
