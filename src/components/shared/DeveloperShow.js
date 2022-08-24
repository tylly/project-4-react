import {useState, useEffect} from 'react'
import {getOneDeveloper} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from '../shared/LoadingChakra'
import { Link } from '@chakra-ui/react'


const DeveloperShowPreview = ({devs, user, msgAlert}) => {

    const [developers, setDevelopers] = useState(null)
    const [updated, setUpdated] = useState(false)
    
    if (!devs) {
        return <LoadingChakra />;
    }
    const devCards = devs.map((dev) =>(
        <div id="developers">
            <h2>{dev.name}</h2>
        </div>
    ))



    return (
        <div>
            {devCards}
        </div>
    )

}

export default DeveloperShowPreview