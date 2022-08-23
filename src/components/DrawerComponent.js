import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  Flex,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const DrawerComponent = ({ isOpen, onClose, btnRef, user, clearUser }) => {
  const navigate = useNavigate()

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      zIndex="popover"
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation Menu</DrawerHeader>

        <DrawerBody>
          <Flex flexDirection="column">
            <Link 
              onClick={() => navigate('/projects')} 
              mb="3"
            >
              Projects
            </Link>
            <Link 
              onClick={() => navigate('/developers')} 
              mb="3"
            >
              Developers
            </Link>
            {user ? (
              <>
                <Link 
                  onClick={() => navigate('/developers/createDev')} 
                  mb='3'
                >
                  Add Developer
                </Link>
                <Link 
                  onClick={() => navigate('/projects/create-project')}
                  mb='3'
                >
                  Add Project
                </Link>
                  <Link 
                    onClick={() => navigate('/change-password')} 
                    mb='3'
                  >
                    Change Password
                  </Link>
                <Link onClick={clearUser} mb="3">Logout</Link>
              </>
            ) : 
            (
              <>
                <Link onClick={() => navigate("/sign-in")} mb="3">Login</Link>
                <Link onClick={() => navigate("/sign-up")} mb="3">Sign Up</Link>
              </>
            )
            }
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerComponent