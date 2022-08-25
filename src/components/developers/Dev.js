import { useState } from "react"
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
        <div style={cardContainerStyle}>
        {/* <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem> */}
          <Center>
            <Box
            maxW={'320px'}
            w={'full'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
            >
            <Avatar
              size={'xl'}
              src={
                'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
              }
              alt={'Avatar Alt'}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {dev.name}
            </Heading>
            <Link href={dev.portfolio} fontWeight={600} color={'gray.500'} mb={4}>
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
            </Stack>

            <Stack align={'center'} justify={'center'} direction={'row'} mt={3} >
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
            </Stack>
    
            <Stack mt={8} direction={'row'} spacing={2} mb={2}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'purple'}
                size='sm'
                color={'white'}
                navigate={navigate}
                user={user}
                developer={dev}
                state={dev._id}
                onClick={() => navigate(`/developers/${dev._id}`)}
               >
               View developer
              </Button>
            </Stack>
          </Box>
          </Center>
          {/* </GridItem>
          </Grid> */}
          </div>
            {/* <Card style={{ width: '30%', margin: 5}} key={ dev._id }>
                <Card.Header>{ dev.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>LinkedIn: { dev.linkedin }</small><br />
                        <small>Github: { dev.github }</small><br />
                    </Card.Text>
                    <hr/>
                    <Card.Text>
                        <Link 
                            to={`/developers/${dev._id}`}
                            state={dev._id}
                        >View  { dev.name }
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card> */}
        </>
    )
}

export default Dev