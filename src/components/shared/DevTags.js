import {useState} from 'react'
import LoadingChakra from '../shared/LoadingChakra'
import { useNavigate }  from 'react-router-dom'
import { Badge, ListItem, UnorderedList, Box } from '@chakra-ui/react';

const DevTags = ({project, user}) => {
    const [projects, setProjects] = useState(null)

    const navigate = useNavigate()
    if (!project) {
        return <LoadingChakra />;
    }
    console.log("this is the project", project)
    // console.log("these are the projects name", project.name)
    // console.log("these are the project tags", project[0].tags)
    const devTags = project.map((project)=> {
        return (
            <Box>
            <UnorderedList>
                <ListItem>
                    <Badge key={project._id}>
                        Tags{project.tags}
                    </Badge>
                </ListItem>
            </UnorderedList>
            </Box>
        )
    })

    return <div>{devTags}</div>


}

export default DevTags