import React, { useState } from 'react'
import {
  Text,
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
  Link,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaAlignJustify } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Nav = ({ onOpen, user, clearUser }) => {
  const [scroll, setScroll] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const navBg = useColorModeValue('white', 'blackAlpha.200')
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)')
  const navigate = useNavigate()
  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false)

  window.addEventListener('scroll', changeScroll)
  console.log('COLOR MODE//////////////>>>>>', colorMode, navBg)
  return (
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      bg={navBg}
    >

      <Text fontSize="xl" fontWeight="bold">
              Project Share
              </Text>
      {isLargerThanMD ? (
        <>
          <Link onClick={() => navigate('/developers')} fontSize="md" ml={6}>
            Developers
          </Link>
          
          <Link onClick={() => navigate('/projects')} fontSize="md" ml={6}>
            Projects
          </Link>

          

          { user ? (
            <>
              <Link onClick={() => navigate('/developers/createDev')} fontSize="md" ml={6}>
                Add Developer
              </Link>
              
              {/* <Link 
                onClick={() => navigate("/myposts")} 
                fontSize="md" 
                ml={6}
              >
                My Posts
              </Link> */}
              <Link 
                onClick={() => navigate('/projects/create-project')}    fontSize="md" ml={6}
              >
                Add Project
              </Link>
              <Link 
                onClick={() => navigate('/change-password')} 
                fontSize="md" 
                ml={6}
              >
                Change Password
              </Link>
            </>) 
            :
            <Link 
              onClick={() => navigate('/sign-up')} 
              fontSize="md" 
              ml={6}
            >
              Sign Up
            </Link>
          }
          
        </>
      ) : (
        <>
          
        </>
      )}
      
      <Spacer />
      
      <Flex alignItems="center">
        <IconButton mr="5" w={6} h={6} p={5} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>

        {isLargerThanMD ? (
          <>
            { user ? 
              <Link onClick={clearUser} mb="3">Logout</Link> 
              : 
              <Link href="/sign-in" fontSize="md" >Log In </Link>
            }
          </>
        ) : (
          <IconButton onClick={onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        )}
      </Flex>
    </Flex>
  )
}

export default Nav