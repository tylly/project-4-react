import React from 'react'

import {
    Box,
    Button,
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
    Textarea,
} from "@chakra-ui/react";

const EditDrawer = ({ isOpen, onClose, btnRef, setName, setDescription, setFront_end_repo, setBack_end_repo, setDeployment, project, handleSubmit, firstField }) => {

    return (

<Drawer
isOpen={isOpen}
placement="right"
onClose={onClose}
firstField={firstField}
size="md"
>
<DrawerOverlay /> 
<DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Edit Project</DrawerHeader>

    <DrawerBody>
    <Stack spacing="24px">
        <Box>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
            id={project._id}
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            defaultValue={project.name}
            required
        />
        </Box>
        <Box>
        <FormLabel htmlFor="desc">Description</FormLabel>
        <Textarea
            name="description"
            id={project._id}
            defaultValue={project.description}
            onChange={(e) => setDescription(e.target.value)}
        />
        </Box>
        <Box>
        <FormLabel htmlFor="url">Deployment URL</FormLabel>
        <InputGroup>
            <Input
            name="deployment"
            id={project._id}
            defaultValue={project.deployment}
            onChange={(e) => setDeployment(e.target.value)}
            type="url"
            placeholder="Please enter domain"
            />
        </InputGroup>
        </Box>
        <Box>
        <FormLabel htmlFor="url">Front-End Repo</FormLabel>
        <InputGroup>
            <Input
            name="front_end_repo"
            id={project._id}
            defaultValue={project.front_end_repo}
            onChange={(e) => setFront_end_repo(e.target.value)}
            type="url"
            placeholder="Please enter domain"
            />
        </InputGroup>
        </Box>
        <Box>
        <FormLabel htmlFor="url">Back-End Repo</FormLabel>
        <InputGroup>
            <Input
            name="back_end_repo"
            id={project._id}
            defaultValue={project.back_end_repo}
            onChange={(e) => setBack_end_repo(e.target.value)}
            type="url"
            placeholder="Please enter domain"
            />
        </InputGroup>
        </Box>
    </Stack>
    </DrawerBody>
    <DrawerFooter>
    <Button variant="outline" mr={3} onClick={onClose}>
        Cancel
    </Button>
    <Button onClick={handleSubmit} colorScheme="blue">
        Save
    </Button>
    </DrawerFooter>
</DrawerContent>
</Drawer>
    )
}

export default EditDrawer