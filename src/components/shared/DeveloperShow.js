import {useState, useEffect} from 'react'
import {getOneDeveloper} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from '../shared/LoadingChakra'
import { Box, Image, Flex, Spacer, Badge, UnorderedList, ListItem, VStack, Link, Grid, GridItem, Button } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as RouteLink, useNavigate }  from 'react-router-dom'
import { getDevPfp } from '../../api/developers'

const DeveloperShowPreview = ({devs, user, msgAlert}) => {

    const [developers, setDevelopers] = useState(null)
    const [updated, setUpdated] = useState(false)
    //console.log(getDevPfp('https://www.linkedin.com/in/haydenmoyes/'))
    const navigate = useNavigate()
    if (!devs) {
        return <LoadingChakra />;
    }
    const devCards = devs.map((dev) => {
      console.log('DEV INSIDE MAP', dev)
      return (

        <Box id="developers" display='inline' key={dev._id}>
            <UnorderedList listStyleType='none'>
            <ListItem  mt={3}>
              <Grid ml='-3'>
                <GridItem colStart={2} mr='1'>
                  {dev.name}
                </GridItem>
                <GridItem >
                  <Link href={dev.linkedin} isExternal> <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjMYGlaMrs0jJqymGdQ4bjEnClG4Q2hO-zQ1TQlDj6tezV9lZxGenCNyayF29fjiahjU&usqp=CAU"
              width="20px"
              height="20px"
              style={{ borderRadius: "5px" }}
            ></img></Link>
                </GridItem>
                <GridItem>
                  <Link href={dev.github} d-inline='true' isExternal> <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhg-eM9fZX7D8Jf3bdcBwV91f6RCGM7FJ5npKy3XHMKcf3ZV_0vOU5qpQUibyh3nfXLWo&usqp=CAU"
              width="20px"
              height="20px"
              style={{ borderRadius: "2px" }}
            ></img></Link>
                </GridItem>
                <GridItem colEnd={6}>
                {/* <Link onClick={() => navigate(`/developers/${dev._id}/`)}> */}
                  <Button colorScheme='whatsapp' onClick={() => navigate(`/developers/${dev._id}/`)} size='xs' mt={-2}>
                    View
                  </Button>
                {/* <Box as='button' borderRadius='sm' colorScheme='whatsapp' color='white' px={4} h={6} alignContent='center'>
                    View
                </Box> */}
                {/* </Link> */}
                </GridItem>
              </Grid>
            </ListItem>
          </UnorderedList> 
        </Box>
    )})

  return <div>{devCards}</div>;
};

export default DeveloperShowPreview;
