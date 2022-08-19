import {useState, useEffect} from 'react'
import {getAllDevelopers} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"

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
                    variant: 'error'
                })
            })
            
    }, [updated])

    if (!developers) {
        return (
            <h1>Loading space holder for animation</h1>
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
            <div style={{marginTop: 100}}>
                {myDevs}
            </div>
        </>
    )

}

export default ShowAllDevelopers