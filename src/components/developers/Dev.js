import { useState } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap"
import { useNavigate} from 'react-router-dom'
import {
    Modal,
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    Image,
    Wrap,
    WrapItem,
    Flex,
    GridItem, 
    Grid,
    SimpleGrid,
    HStack, 
} from '@chakra-ui/react'

const linkStyle = {
    textDecoration: 'none'
  }

const cardContainerStyle = {
    marginTop: "100px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
};

const Dev = ({dev, user, msgAlert, navigate}) => {
    
    
    return (
        <>
            <Box
            backgroundColor="rgba(255, 255, 255, 0.8)"
            borderWidth="1px"
            borderRadius="lg"
            maxW={'320px'}
            w={'250px'}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
            m={10}
            style={{zIndex: '1', color: 'black'}}
            >
            <Avatar
              size={'xl'}
              src={
                dev.avatar
              }
              alt={'Avatar Alt'}
              mb={4}
              pos={'relative'}
              // _after={{
              //   content: '""',
              //   w: 4,
              //   h: 4,
              //   bg: 'green.300',
              //   border: '2px solid white',
              //   rounded: 'full',
              //   pos: 'absolute',
              //   bottom: 0,
              //   right: 3,
              // }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'} color={'black'}>
              {dev.name}
            </Heading>
            {/* <Link href={dev.portfolio} fontWeight={600} color={'gray.500'} mb={4}>
              {dev.portfolio}
            </Link>
            <Stack direction='row' mt={5} boxSize='50px'>
                <Image
                    boxSize='20px'
                    objectFit='cover'
                    src='https://cdn-icons-png.flaticon.com/512/174/174857.png'
                    alt='Linked In'
                /><Link href={dev.linkedin} textAlign='left' boxSize={'250px'} fontSize={'15px'} style={linkStyle} isExternal>{dev.linkedin} </Link>
            </Stack>
            <Stack direction='row' mt={3} boxSize='50px'>
                <Image
                    boxSize='20px'
                    objectFit='cover'
                    src='https://www.svgrepo.com/show/332401/github.svg'
                    alt='Github'
                /><Link href={dev.github}textAlign='left' boxSize={'250px'} fontSize={'15px'} style={linkStyle} isExternal>{dev.github}</Link>
            </Stack> */}

            {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={3} >
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
            </Stack> */}
            <Stack mt={8} direction={'row'} spacing={2} mb={2}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'#9310ea'}
                size='sm'
                color={'white'}
                onClick={() => navigate(`/developers/${dev._id}`)}
               >
               View developer
              </Button>
            </Stack>
          </Box>
        </>
    )
}

export default Dev