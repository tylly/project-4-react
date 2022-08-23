import {useState, useEffect} from 'react'
import {getAllDevelopers} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from '../shared/LoadingChakra'


const ShowAllDevelopers = ({user, msgAlert}) => {

    const [developers, setDevelopers] = useState(null)
    const [updated, setUpdated] = useState(false)
    
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
        return <Dev
            dev={dev}
            key={i}
            user={user}
            devId={dev._id}
            triggerRefresh={() => setUpdated(prev=>!prev)}
            msgAlert={msgAlert}
            />
    })

    return (
        <>
            {myDevs}
        </>
    )

}

export default ShowAllDevelopers