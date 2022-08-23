import React from 'react'
import "../../style.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure, 
  FormLabel,
  Stack,
  Box, 
  Input, 
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea, 
  Button
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';

const EditProjectForm = (props) => {
  const { project, handleChange, heading, handleSubmit } = props;

  console.log(project);
  const formStyle = {
    color: "white",
    textAlign: "center",
    position: "absolute",
    zIndex: "2",
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()

  return(
    <>
    <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={onOpen}>
        Edit
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        initialFocusRef={firstField}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Project</DrawerHeader>

          <DrawerBody>
          <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  name="name"
                  id={project._id}
                  value={project.name}
                  onChange={handleChange}
                  ref={firstField}
                 
                  placeholder='Please enter name of project'
                />
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea
                    name="description"
                    id={project._id}
                    value={project.description}
                    onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel htmlFor='url'>Deployment URL</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    name="deployment"
                    id={project._id}
                    value={project.deployment}
                    onChange={handleChange}
                    type='url'
                    placeholder='Please enter domain'
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor='url'>Front-End Repo</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    name="front_end_repo"
                    id={project._id}
                    value={project.front_end_repo}
                    onChange={handleChange}
                    type='url'
                    placeholder='Please enter domain'
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor='url'>Back-End Repo</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    name="deployment"
                    id={project._id}
                    value={project.back_end_repo}
                    onChange={handleChange}
                    type='url'
                    placeholder='Please enter domain'
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
  // return (
  //   <div className="row" id="destinationForm" style={formStyle}>
  //     <div className="col-md mx-auto mt-5">
  //       <h3 style={{ color: "white" }} id="destinationFormHeading">
  //         {heading}
  //       </h3>
  //       <Form className="cards" onSubmit={handleSubmit}>
  //         <Form.Control
  //           placeholder="Project name"
  //           name="name"
  //           id={project._id}
  //           value={project.name}
  //           onChange={handleChange}
  //           className="mt-2"
  //           style={{ textAlign: "center" }}
  //         />
  //         <Form.Control
  //           placeholder="Project description"
  //           name="description"
  //           id={project._id}
  //           value={project.description}
  //           onChange={handleChange}
  //           className="mt-2"
  //           style={{ textAlign: "center" }}
  //         />
  //         <Form.Control
  //           placeholder="Project deployment"
  //           name="deployment"
  //           id={project._id}
  //           value={project.deployment}
  //           onChange={handleChange}
  //           className="mt-2"
  //           style={{ textAlign: "center" }}
  //         />
  //         <Form.Control
  //           placeholder="Project font end repo"
  //           name="font_end_repo"
  //           id={project._id}
  //           value={project.font_end_repo}
  //           onChange={handleChange}
  //           className="mt-2"
  //           style={{ textAlign: "center" }}
  //         />
  //                   <Form.Control
  //           placeholder="Project font end repo"
  //           name="font_end_repo"
  //           id={project._id}
  //           value={project.font_end_repo}
  //           onChange={handleChange}
  //           className="mt-2"
  //           style={{ textAlign: "center" }}
  //         />

  //         <Button type="submit" className="mt-3" size="sm">
  //           Submit
  //         </Button>
  //       </Form>
  //     </div>
  //   </div>
  // );
};

export default EditProjectForm;
