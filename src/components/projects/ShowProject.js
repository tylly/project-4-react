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
import {
  removeProjectFromDeveloper,
  getOneDevByName,
} from "../../api/developers";
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
  WrapItem,
  Wrap,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Avatar,
  Center,
  Text,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
} from "@chakra-ui/icons";
import EditDrawer from "./EditDrawer";
import AddDevToProject from "../developers/AddDevToProject";

const ShowProject = (props) => {
  const [project, setProject] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [front_end_repo, setFront_end_repo] = useState("");
  const [back_end_repo, setBack_end_repo] = useState("");
  const [deployment, setDeployment] = useState("");
  const [devs, setDevs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
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
        console.log(
          "USER\n",
          user,
          "\n project._id\n",
          project._id,
          "Dev array\n",
          project.developers
        );
        removeProjectFromDeveloper(user, project._id, project.developers)
          .then()
          .catch((err) => {
            console.log(err);
            msgAlert({
              heading: "Error",
              message: messages.errorRemovingProjectFromDev,
            });
          });
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

  const developerSideBar = project.developers.map((developer) => (
    <ListItem paddingBottom={"10px"}>
      <Grid>
        <GridItem colStart={2}>
          <Link href={developer.linkedin}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjMYGlaMrs0jJqymGdQ4bjEnClG4Q2hO-zQ1TQlDj6tezV9lZxGenCNyayF29fjiahjU&usqp=CAU"
              width="20px"
              height="20px"
              style={{ borderRadius: "5px" }}
            ></img>
          </Link>
        </GridItem>
        <GridItem>
          <Link href={developer.github}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhg-eM9fZX7D8Jf3bdcBwV91f6RCGM7FJ5npKy3XHMKcf3ZV_0vOU5qpQUibyh3nfXLWo&usqp=CAU"
              width="20px"
              height="20px"
              style={{ borderRadius: "2px" }}
            ></img>
          </Link>
        </GridItem>
        <GridItem colEnd={6}>{developer.name}</GridItem>
      </Grid>
    </ListItem>
  ));

  // console.log("this is the tags", project.tags)
  const tagSidebar = project.tags.map((tag) => (
    <ListItem>
      <Badge mr="5" colorScheme="linkedin" variant="solid">
        {tag}
      </Badge>
    </ListItem>
  ));
  return (
    <>
      <Flex>
        <Box
          backgroundColor="rgba(255, 255, 255, 0.2)"
          maxW="sm"
          maxH="900px"
          borderWidth="1.5px"
          borderRadius="lg"
          overflow="hidden"
          marginTop="80px"
          marginLeft="25%"
          width="50%"
          style={{ zIndex: "1", color: "white" }}
        >
          <Image src={project.img} maxWidth="200px" margin='auto' marginTop='10px' borderRadius='5px' border='1.5px solid white' />
          <Box p="3" style={{ zIndex: "1", color: "white" }}>
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
              <Link
                href={project.front_end_repo}
                isExternal
                paddingRight="10px"
              >
                Front-End Repo
                <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
            <Box mt="2" style={{ zIndex: "1", color: "white" }}>
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
        <VStack
          position="fixed"
          spacing={-0.8}
          marginTop={"-2px"}
          marginLeft={"83%"}
          align="stretch"
          width={"250px"}
          backgroundColor="rgba(255, 255, 255, 0.2)"
        >
          <Box
            p="8"
            borderWidth="2px"
            pb="30%"
            textAlign="center"
            style={{ zIndex: "1", color: "white" }}
          >
            <h1>
              <strong>Tags:</strong>{" "}
            </h1>
            <UnorderedList
              listStyleType="none"
              textAlign="center"
              marginTop="5px"
            >
              {tagSidebar}
            </UnorderedList>
          </Box>
          <Box
            p="8"
            borderWidth="2px"
            pb="150%"
            style={{ zIndex: "1", color: "white" }}
          >
            <h1
              style={{
                textAlign: "center",
                paddingBottom: "10px",
                zIndex: "1",
                color: "white",
              }}
            >
              <strong>Developers:</strong>
            </h1>
            <UnorderedList
              marginTop="8px"
              listStyleType="none"
              textAlign="left"
            >
              {developerSideBar}
            </UnorderedList>
            {user && project.owner === user._id ? (
              <Wrap direction="row" justify="right" p="2">
                <WrapItem>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="orange"
                    size="xs"
                    onClick={onModalOpen}
                  >
                    Add Developer
                  </Button>
                </WrapItem>
              </Wrap>
            ) : null}
          </Box>
        </VStack>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <AddDevToProject
              msgAlert={msgAlert}
              user={user}
              triggerRefresh={() => setUpdated((prev) => !prev)}
              // dev={developer}
              onModalClose={onModalClose}
              project={project}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowProject;
