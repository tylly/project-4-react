import {useState, useEffect} from 'react'
import {getAllDevelopers} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from '../shared/LoadingChakra'
import {  useNavigate } from 'react-router-dom'
import {
    SimpleGrid, 
} from '@chakra-ui/react'

const ShowAllDevelopers = ({user, msgAlert}) => {

    const [developers, setDevelopers] = useState(null)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getAllDevelopers()
            
            .then(res => {
                console.log('resdata========>>\n', res.data.developers)
                setDevelopers(res.data.developers)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.errorShowingDevs,
                    variant: 'danger'
                })
            })
            
    }, [updated])

    if (!developers) {
        return (
            
                <LoadingChakra
                    style={{
                        marginTop: 100,
                        paddingTop: 100
                    }}
                    align='center'
                    justify='center'
                />
            
           
        )
    } else if (developers.length === 0) {
        return (
            'No developers'
        )
    }
    console.log('THIS IS DEVS======>>\n', developers)
    const myDevs = developers.map((dev, i) => {
        return  <Dev
                    dev={dev}
                    key={i}
                    user={user}
                    devId={dev._id}
                    triggerRefresh={() => setUpdated(prev=>!prev)}
                    msgAlert={msgAlert}
                    navigate={navigate}
                />
    })

    return (
        <>
        <SimpleGrid ml={7} mr={7} columns={{sm: 2, md: 3, lg: 4}}>
            {myDevs}
        </SimpleGrid>
        </>
    )

}

export default ShowAllDevelopers