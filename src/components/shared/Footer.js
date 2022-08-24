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
      marginTop='70%'

    >
      <Text mb="3">
         By{' '}
        <Link href="https://github.com/tylly/project-4-react" isExternal color="blue.500">
          Team Breakout Room 3
        </Link>
      </Text>
      <Text opacity="0.5">Slatt!!!</Text>
    </Flex>
  )
}

export default Footer