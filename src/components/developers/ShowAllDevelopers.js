import {useState, useEffect} from 'react'
import {getAllDevelopers} from '../../api/developers'
import Dev from '../developers/Dev'
import messages from "../shared/AutoDismissAlert/messages"

const ShowAllDevelopers = ({user, msgAlert}) => {

    const [devs, setDevs] = useState(null)
    const [updated, setUpdated] = useState(false)
    
    useEffect(() => {
        getAllDevelopers()
            
            .then(res => {
                console.log('resdata========>>\n', res.data)
                setDevs(res.data)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.errorShowingDevs,
                    variant: 'error'
                })
            })
    }, [updated])

    if (!devs) {
        return (
            <h1>Loading space holder for animation</h1>
        )
    } else if (devs.length === 0) {
        return (
            'No devs'
        )
    }

    const myDevs = devs.map((dev, i) => {
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
            {myDevs.reverse()}
        </>
    )

}

export default ShowAllDevelopers