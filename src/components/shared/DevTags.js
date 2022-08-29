import {useState} from 'react'
import LoadingChakra from '../shared/LoadingChakra'
import { useNavigate }  from 'react-router-dom'
import { Badge, ListItem, UnorderedList, Box, WrapItem } from '@chakra-ui/react';

const DevTags = ({project, user}) => {
    const [projects, setProjects] = useState(null)

    // const navigate = useNavigate()
    // if (!project) {
    //     return <LoadingChakra />;
    // }
    const navigate = useNavigate()
    if (!project[0].tags) {
        return <h2>No tags available</h2>;
    }
    console.log("this is the project", project)
    console.log("these are the projects name", project[0].name)
    // console.log("these are the project tags", project[0].tags)
    const devTags = project[0].tags.map((tag)=> {
        return (
                <WrapItem>
                    <Badge borderRadius='full' px='2' colorScheme='linkedin' variant='solid' mr='1'>
                        {tag}
                    </Badge>
                </WrapItem>
        )
    })

    return <div>{devTags}</div>


}

export default DevTags