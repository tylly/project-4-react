import { useState } from "react"
import { Card, Modal     } from "react-bootstrap"
import { Navigate, Link } from 'react-router-dom'

const Dev = ({dev, user, msgAlert}) => {
    
    
    return (
        <>
            <Card style={{ width: '30%', margin: 5}} key={ dev._id }>
                <Card.Header>{ dev.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>LinkedIn: { dev.linkedin }</small><br />
                        <small>Github: { dev.github }</small><br />
                    </Card.Text>
                    <hr/>
                    <Card.Text>
                        <Link 
                            to={`/developers/${dev._id}`}
                            state={dev._id}
                        >View { dev.name }
                        </Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dev