import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import "../../style.css";

import { Container, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getOneProject,
  updateProject,
  removeProject,
} from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import EditProjectsModal from "./EditProjectsModal";
import { Box, Image, Flex, Spacer, Badge, UnorderedList, ListItem, VStack, Link, Grid, GridItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

// import EditDestinationModal from "./EditDestinationModal";
// import NewActivityModal from "../activities/NewActivityModal";
// import SearchActivityModal from "../activities/SearchActivityModal";
// import ShowActivity from "../activities/ShowActivity";
import axios from "axios";
import ShowDevelopers from "../developers/ShowDeveloper";

// We need to get the destination's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
  display: "flex",
  justifyContent: "center",
};

const ShowProject = (props) => {
  const [project, setProject] = useState(null);
  //   const [activityModalShow, setActivityModalShow] = useState(false);
     const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  //   const [searchActivityModalShow, setSearchActivityModalShow] = useState(false);
  console.log(props);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, msgAlert } = props;

  useEffect(() => {
    getOneProject(id)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
        //navigate back to the home page if there's an error fetching
      });
  }, [updated]);

  const removeTheProject = () => {
    removeProject(user, project._id)
      // on success send a success message
      .then(() => {
        msgAlert({
          heading: "Success",
          message: messages.removeProjectSuccess,
          variant: "success",
        });
      })
      // then navigate to index
      .then(() => {
        navigate("/");
      })
      // on failure send a failure message
      .catch((err) => {
        msgAlert({
          heading: "Error removing project",
          message: messages.removeProjectFailure,
          variant: "danger",
        });
      });
  };

  if (!project) {
    return <LoadingScreen />;
  }

  // const property = {
  //   imageUrl: 'https://bit.ly/2Z4KKcF',
  //   imageAlt: 'Rear view of modern home with pool',
  //   beds: 3,
  //   baths: 2,
  //   title: 'Modern home in city center in the heart of historic Los Angeles',
  //   formattedPrice: '$1,900.00',
  //   reviewCount: 34,
  //   rating: 4,
  // }
  console.log('this is the front end repo', project.front_end_repo)

  return (
    <Flex>
    <Box maxW='sm' maxH='lg' borderWidth='1px' borderRadius='lg' overflow='hidden' marginTop='10%'  marginLeft='25%' width='50%'>
      <Image src={project.img} />
      <Box p='3'>
        <Box display='flex' alignItems='baseline'>
          <Box
          mt='1'
          fontWeight='semibold'
          as='h1'
          lineHeight='tight'
          noOfLines={1}
          >
          {project.name}
          </Box>
        </Box>
          <Box
          mt='1'
          as='h1'
          lineHeight='tight'
          >
            Description: {project.description}
          </Box>
          <Box>
          <Link href={project.deployment} isExternal  paddingRight='10px'>
            Deployment URL<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
          <Box>
          <Link href={project.front_end_repo} isExternal  paddingRight='10px'>
            Front-End Repo<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
          <Box>
          <Link href={project.back_end_repo} isExternal>
            Back-End Repo<ExternalLinkIcon mx='2px' />
          </Link>
          </Box>
      </Box>
    </Box>
    <Spacer />
    <VStack spacing={-.85} align='stretch' w='250px'>
        <Box p='8' borderWidth='1px' pb='100%' marginTop='55px' textAlign='center'>
          <h1><strong style={{ paddingBottom: '10px'}}>Tags:</strong> </h1>
          <UnorderedList listStyleType='none'textAlign='center'>
            <ListItem>
            {/* Will map through each tag*/}
            <Badge mr='5'>
            React
            {project.tag}
            </Badge>
            </ListItem>
          </UnorderedList>
          
        </Box>
        <Box p='8' borderWidth='1px' pb='150%' marginTop='55px' >
          <h1 style={{textAlign: 'center', paddingBottom: '10px'}}><strong>Developers:</strong></h1>
          <UnorderedList listStyleType='none'>
            <ListItem>
              <Grid ml='-3'>
                <GridItem colStart={2} mr='-2'>
                  {/* Map through links */}
                  <Link href='https://www.linkedin.com/in/amanda-corral-01a90a168/'><img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' width='20px' height='20px'></img></Link>
                </GridItem>
                <GridItem >
                  <Link href='https://github.com/Amandacorral07' d-inline><img src='https://www.svgrepo.com/show/332401/github.svg' width='20px' height='20px'></img>
                  </Link>
                </GridItem>
                <GridItem colEnd={6} ml='-4'>
                  {/* {developer.name} map through */}
                  Mands
                </GridItem>
              </Grid>
            </ListItem>
          </UnorderedList> 
        </Box>
    </VStack>
    
   
    

      {/* <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          <Card.Body>
            <Card.Text>
              <h1 style={cardContainerLayout}>{project.name}</h1>
              <img src={project.img}></img>
              
            </Card.Text>
            {user && project.owner === user._id ? (
              <>
                <Button
                  onClick={() => setEditModalShow(true)}
                  className="m-2"
                  variant="outline-primary"
                  size="sm"

        <Box>
          {property.formattedPrice}
          <Box as='span' color='gray.600' fontSize='sm'>
            / wk
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < property.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  ) */}


  {/* // return (
  //   <>
  //     <Container className="fluid" style={{ marginTop: "10%" }}>
  //       <Card
  //         //style={{ width: "30rem", zIndex: "2" }}
  //         className="mx-auto mt-4"
  //         id="card"
  //       >
  //         <Card.Body>
  //           <Card.Text>
  //             <h1 style={cardContainerLayout}>{project.name}</h1>
  //             <img src={project.img}></img>
  //           </Card.Text>
  //           {user && project.owner === user._id ? (
  //             <>
  //               <Button
  //                 onClick={() => setEditModalShow(true)}
  //                 className="m-2"
  //                 variant="outline-primary"
  //                 size="sm"

  //               >
  //                 Edit Destination
  //               </Button>
  //               <Button
  //                 onClick={() => removeTheProject()}
  //                 className="m-2"
  //                 variant="outline-danger"
  //                 size="sm"
  //               >
  //                 Delete
  //               </Button>
  //             </>
  //           ) : null}
  //         </Card.Body>
  //       </Card>
       
  //     </Container> */}

     <EditProjectsModal
        user={user}
        project={project}
        show={editModalShow}
        updateProject={updateProject}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated((prev) => !prev)}
        handleClose={() => setEditModalShow(false)}
      />
     </Flex>
  );
};

export default ShowProject;
