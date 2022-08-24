import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import "../../style.css";

import { Container, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getOneProject,
  updateProject,
  removeProject,
} from "../../api/projects";
import messages from "../shared/AutoDismissAlert/messages";
import EditProjectsModal from "./EditProjectsModal";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
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
  console.log("this is the front end repo", project.front_end_repo);

  const developerSideBar = project.developers.map((developer) => (
    <Box p="8" borderWidth="1px" pb="150%" marginTop="55px">
      <h1 style={{ textAlign: "center", paddingBottom: "10px" }}>
        <strong>Developers:</strong>
      </h1>
      <UnorderedList listStyleType="none">
        <ListItem>
          <Grid ml="-3">
            <GridItem colStart={2} mr="-2">
              {/* Map through links */}
              <Link href={developer.linkedin}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  width="20px"
                  height="20px"
                ></img>
              </Link>
            </GridItem>
            <GridItem>
              <Link href={developer.github} d-inline>
                <img
                  src="https://www.svgrepo.com/show/332401/github.svg"
                  width="20px"
                  height="20px"
                ></img>
              </Link>
            </GridItem>
            <GridItem colEnd={6} ml="-4">
              {/* {developer.name} map through */}
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
              onClick={() => removeTheProject()}
            >
              Add Developer
            </Button>
          </WrapItem>
        </Wrap>
      ) : null}
    </Box>
  ));

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
      >
        <Image src={project.img} />
        <Box p="3">
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
          <Box mt="2">
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
      <VStack spacing={-0.85} align="stretch" w="250px">
        <Box
          p="8"
          borderWidth="1px"
          pb="100%"
          marginTop="55px"
          textAlign="center"
        >
          <h1>
            <strong style={{ paddingBottom: "10px" }}>Tags:</strong>{" "}
          </h1>
          <UnorderedList listStyleType="none" textAlign="center">
            <ListItem>
              {/* Will map through each tag*/}
              <Badge mr="5">
                {project.tags}
              </Badge>
            </ListItem>
          </UnorderedList>
        </Box>
        {/* {developerSideBar} */}
      </VStack>
    </Flex>
  );
};

export default ShowProject;
