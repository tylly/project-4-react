import { Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      position='absolute'
      marginTop='60%'
    >
      <Text mb="3" color='white'>
         By{' '}
        <Link href="https://github.com/tylly/project-4-react" isExternal>
          Team Breakout Room 3
        </Link>
      </Text>
      <Text color='white' opacity="0.7">Slatt!!!</Text>
    </Flex>
  )
}

export default Footer