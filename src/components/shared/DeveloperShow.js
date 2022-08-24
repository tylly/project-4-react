import {useState, useEffect} from 'react'
import {getOneDeveloper} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from '../shared/LoadingChakra'
import { Box, Image, Flex, Spacer, Badge, UnorderedList, ListItem, VStack, Link, Grid, GridItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link as RouteLink, useNavigate }  from 'react-router-dom'
import { getDevPfp } from '../../api/developers'

const DeveloperShowPreview = ({devs, user, msgAlert}) => {

    const [developers, setDevelopers] = useState(null)
    const [updated, setUpdated] = useState(false)
    console.log(getDevPfp('https://www.linkedin.com/in/haydenmoyes/'))
    const navigate = useNavigate()
    if (!devs) {
        return <LoadingChakra />;
    }
    const devCards = devs.map((dev) =>(
        <Box id="developers" display='inline'>
            <UnorderedList listStyleType='none'>
            <ListItem>
              <Grid ml='-3'>
                <GridItem colStart={2} mr='1'>
                  {dev.name}
                </GridItem>
                <GridItem >
                  <Link href={dev.linkedin} isExternal><img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' width='20px' height='20px'></img><ExternalLinkIcon mx='2px' /></Link>
                </GridItem>
                <GridItem>
                  <Link href={dev.github} d-inline isExternal><img src='https://www.svgrepo.com/show/332401/github.svg' width='20px' height='20px'></img><ExternalLinkIcon mx='2px' /></Link>
                </GridItem>
                <GridItem colEnd={6}>
                <Link onClick={() => navigate(`/developers/${dev._id}`)}>
                <Box as='button' borderRadius='sm' bg='orange' color='white' px={4} h={8} alignContent='center'>
                    View
                </Box>
                </Link>
                </GridItem>
              </Grid>
            </ListItem>
          </UnorderedList> 
        </Box>
    ))

  return <div>{devCards}</div>;
};

export default DeveloperShowPreview;
