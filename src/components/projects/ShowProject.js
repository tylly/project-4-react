import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../style.css";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getOneProject,
  updateProject,
  removeProject,
} from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import {
  Box,
  Image,
  Flex,
  Spacer,
  Badge,
  UnorderedList,
  ListItem,
  VStack,
  Link,
  Grid,
  GridItem,
  Button,
  WrapItem,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
} from "@chakra-ui/icons";
import EditDrawer from "./EditDrawer";

const ShowProject = (props) => {
  const [project, setProject] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [front_end_repo, setFront_end_repo] = useState("");
  const [back_end_repo, setBack_end_repo] = useState("");
  const [deployment, setDeployment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { user, handleClose, msgAlert } = props;
  const triggerRefresh = () => setUpdated((prev) => !prev);
  console.log(props);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneProject(id)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [updated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      name,
      description,
      deployment,
      front_end_repo,
      back_end_repo,
    };

    updateProject(user, project._id, updatedProject)
      .then(() => {
        onClose();
      })
      .then(() => triggerRefresh())
      .catch(() =>
        msgAlert({
          heading: "oh no!",
          message: "failure",
          variant: "danger",
        })
      );
  };

  const removeTheProject = () => {
    removeProject(user, project._id)
      .then(() => {
        msgAlert({
          heading: "Success",
          message: messages.removeProjectSuccess,
          variant: "success",
        });
      })
      .then(() => {
        navigate("/");
      })
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

  // if (!project.developers){
  //   return <Box>
  //           This project does not have any developers. You can add some by clicking "Add developer"
  //         </Box>
  // }
  const developerSideBar = project.developers.map((developer) => (
    <Box p="8" borderWidth="1px" pb="150%" marginTop="55px" style={{zIndex: '1', color: 'white'}}>
      <h1 style={{ textAlign: "center", paddingBottom: "10px", zIndex: '1', color: 'white' }}>
        <strong>Developers:</strong>
      </h1>
      <UnorderedList listStyleType="none">
        <ListItem>
          <Grid ml="-3">
            <GridItem colStart={2} mr="-1">
              <Link href={developer.linkedin}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjMYGlaMrs0jJqymGdQ4bjEnClG4Q2hO-zQ1TQlDj6tezV9lZxGenCNyayF29fjiahjU&usqp=CAU"
                  width="20px"
                  height="20px"
                ></img>
              </Link>
            </GridItem>
            <GridItem>
              <Link href={developer.github} d-inline>
                <img
                  src="https://i.pinimg.com/736x/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.jpg"
                  width="20px"
                  height="20px"
                ></img>
              </Link>
            </GridItem>
            <GridItem colEnd={6} ml="-2">
              {developer.name}
            </GridItem>
          </Grid>
        </ListItem>
      </UnorderedList>
      {user && project.owner === user._id ? (
        <Wrap direction="row" justify="right" p="2">
          <WrapItem>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="orange"
              size="xs"
              onClick={() => navigate("/developers/createDev")}
            >
              Add Developer
            </Button>
          </WrapItem>
        </Wrap>
      ) : null}
    </Box>
  ));

  // console.log("this is the tags", project.tags)
  const tagSidebar = project.tags.map((tag)=>(
        <ListItem>
          <Badge mr="5">
            {tag}
          </Badge>
        </ListItem>
  ))
  return (
    <Flex>
      <Box
        maxW="lg"
        maxH="80%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        marginTop="80px"
        marginLeft="25%"
        width="50%"
        style={{zIndex: '1', color: 'white'}}
      >
        <Image src={project.img} />
        <Box p="3" style={{zIndex: '1', color: 'white'}}>
          <Box display="flex" alignItems="baseline">
            <Box
              mt="2"
              fontWeight="semibold"
              as="h1"
              lineHeight="tight"
              noOfLines={1}
            >
              {project.name}
            </Box>
          </Box>
          <Box mt="4" as="h1" lineHeight="tight">
            Description: {project.description}
          </Box>
          <Box mt="2">
            <Link href={project.deployment} isExternal paddingRight="10px">
              Deployment URL
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
          <Box mt="2">
            <Link href={project.front_end_repo} isExternal paddingRight="10px">
              Front-End Repo
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
          <Box mt="2" style={{zIndex: '1', color: 'white'}}>
            <Link href={project.back_end_repo} isExternal>
              Back-End Repo
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </Box>
        {user && project.owner === user._id ? (
          <Wrap direction="row" justify="right" p="2">
            <WrapItem>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                size="xs"
                onClick={() => removeTheProject()}
              >
                Delete
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="linkedin"
                size="xs"
                onClick={onOpen}
              >
                Edit
              </Button>
              <EditDrawer
                isOpen={isOpen}
                onClose={onClose}
                setName={setName}
                setDescription={setDescription}
                setFront_end_repo={setFront_end_repo}
                setBack_end_repo={setBack_end_repo}
                setDeployment={setDeployment}
                project={project}
                handleSubmit={handleSubmit}
                firstField={firstField}
              />
              
            </WrapItem>
          </Wrap>
        ) : null}
      </Box>
      <Spacer />
      <VStack spacing={-0.85} marginTop={'-2px'}align="stretch" w="250px">
        <Box
          p="8"
          borderWidth="1px"
          pb="100%"
          textAlign="center"
          style={{zIndex: '1', color: 'white'}}
        >
          <h1>
            <strong style={{ paddingBottom: "10px" }}>Tags:</strong>{" "}
          </h1>
          <UnorderedList listStyleType="none" textAlign="center">
            {tagSidebar}
          </UnorderedList>
        </Box>
        {developerSideBar}
      </VStack>
    </Flex>
  );
};

export default ShowProject;
