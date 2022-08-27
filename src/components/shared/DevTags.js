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
    console.log("these are the projects name", project[0].name)
    // console.log("these are the project tags", project[0].tags)
    const devTags = project[0].tags.map((tag)=> {
        return (
            
                <ListItem style={{listStyle: 'none'}}>
                    <Badge>
                        Tags{tag}
                    </Badge>
                </ListItem>
            
        )
    })

    return <div>{devTags}</div>


}

export default DevTags