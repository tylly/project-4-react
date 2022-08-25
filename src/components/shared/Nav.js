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
  useDisclosure, 
  Box,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaAlignJustify } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import "../../style.css";

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

  const navStyle = {
    textDecoration: 'none',
    color: 'white'
  }
  window.addEventListener('scroll', changeScroll)
  //console.log('COLOR MODE//////////////>>>>>', colorMode, navBg)
  return (
    // <Box bgGradient='linear(to-l, #7928CA, #FF0080)' zIndex="sticky">
    <Flex
      h="10vh"
      alignItems="center"
      p="6"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      // bgGradient='linear(to-l, #7928CA, #00c7ff,#FF0080)'
      
      id='navbar'
      // bg={navBg}
    >
      {/* bgGradient='linear(to-l, #7928CA, #FF0080)' */}

      <Text fontSize="xl" fontWeight="bold"  bgClip='text' color='white'>
              Project Share
              </Text>
      {isLargerThanMD ? (
        <>
        <div id="navCont">
          <Link  style={navStyle} class="navItems" onClick={() => navigate('/developers')} fontSize="md" ml={6}>
            Developers
          </Link>
          
          <Link  style={navStyle} class="navItems" onClick={() => navigate('/projects')} fontSize="md" ml={6}>
            Projects
          </Link>

          

          { user ? (
            <>
              <Link  style={navStyle} class="navItems" onClick={() => navigate('/developers/createDev')} fontSize="md" ml={6}>
                Add Developer
              </Link>
              
              {/* <Link 
                onClick={() => navigate("/myposts")} 
                fontSize="md" 
                ml={6}
              >
                My Posts
              </Link> */}
              <Link  style={navStyle} class="navItems" 
                onClick={() => navigate('/projects/create-project')}    fontSize="md" ml={6}
              >
                Add Project
              </Link>
              <Link class="navItems" 
                onClick={() => navigate('/change-password')} 
                fontSize="md" 
                ml={6}
                style={navStyle}
              >
                Change Password
              </Link>
            </>) 
            :
            <Link class="navItems" 
              onClick={() => navigate('/sign-up')} 
              fontSize="md" 
              ml={6}
              style={navStyle}
            >
              Sign Up
            </Link>
          }
          </div>
          
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
              <Link onClick={clearUser} mb="3" style={navStyle}>Logout</Link> 
              : 
              <Link href="/sign-in" fontSize="md" style={navStyle}>Log In </Link>
            }
          </>
        ) : (
          <IconButton onClick={onOpen}>
            <Icon as={FaAlignJustify} />
          </IconButton>
        )}
      </Flex>
    </Flex>
    // </Box>
  )
}

export default Nav