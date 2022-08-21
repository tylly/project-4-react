import { getOneDeveloper } from "../../api/developers"
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingChakra from "../shared/LoadingChakra"

const ShowDevelopers = ({msgAlert, user}) => {

    const location = useLocation()
    console.log(location)
    const state = location.state
    console.log('THIS IS THE STATE IN DEV SHOW PAGE=======>>', state)
    //console.log('I am the params in sho dev=======>>', dev._id)
    const [ developer, setDeveloper ] = useState(null)

    useEffect(() => {
        getOneDeveloper(state)
            .then(res => {
                console.log('resdata in showdev========>>\n', res.data)
                setDeveloper(res.data.developer)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.errorShowingDevs,
                    variant: 'danger'
                })
            })
            
    }, [])

    if (!developer) {
        return (
            <LoadingChakra
                marginTop='100'
                align='center'
                justify='center'
            />
        )
    } 

    return (
        <>
            <Card style={{ width: '30%', margin: 5, marginTop: 75}} key={ developer._id }>
                <Card.Header>{ developer.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>LinkedIn: { developer.linkedin }</small><br />
                        <small>Github: { developer.github }</small><br />
                        <hr/>
                        <small>Projects: { developer.projects }</small><br/>
                        <hr/>
                        <Link to={`/developers/`}>Back to index</Link>

                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
    
}

export default ShowDevelopers