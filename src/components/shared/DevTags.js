import {useState} from 'react'
import LoadingChakra from '../shared/LoadingChakra'
import { useNavigate }  from 'react-router-dom'
import { Badge, ListItem, UnorderedList, Box, WrapItem } from '@chakra-ui/react';

const DevTags = ({developer, user}) => {
    const [projects, setProjects] = useState(null)

    // const navigate = useNavigate()
    // if (!project) {
    //     return <LoadingChakra />;
    // }
    const navigate = useNavigate()
    if (!developer.projects[0]) {
        return <h2>No tags available</h2>;
    }
    console.log("this is the projects in developer", developer.projects)
    // console.log("these are the projects name", project[0].name)
    // console.log("these are the project tags", project[0].tags)
    const devTags = developer.projects[0].tags.map((tag)=> {
        return (
                <WrapItem>
                    <Badge borderRadius='full' px='2' colorScheme='linkedin' variant='solid' mr='1'>
                        {tag}
                    </Badge>
                </WrapItem>
        )
    })

    return <div><h4>Tags: </h4>{devTags}</div>

}

export default DevTags