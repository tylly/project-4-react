import {useState} from 'react'
import LoadingChakra from '../shared/LoadingChakra'
import { useNavigate }  from 'react-router-dom'
import { Badge, ListItem, UnorderedList, Box } from '@chakra-ui/react';

const DevTags = ({developer, user}) => {
    const [projects, setProjects] = useState(null)

    const navigate = useNavigate()
    if (!developer) {
        return <LoadingChakra />;
    }
    console.log("this is the projects in developer", developer.projects)
    // console.log("these are the projects name", project[0].name)
    // console.log("these are the project tags", project[0].tags)
    // const devTags = project[0].tags.map((tag)=> {
    //     return (
            
    //             <ListItem style={{listStyle: 'none'}}>
    //                 <Badge>
    //                     {tag}
    //                 </Badge>
    //             </ListItem>
            
    //     )
    // })

    return (
    <div>
        {/* {devTags} */}{developer.projects[0].tags[0]}
        </div>
    )

}

export default DevTags