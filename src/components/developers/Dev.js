import { useState } from "react"
import { Card } from "react-bootstrap"

const Dev = ({dev, user, msgAlert}) => {
    
    
    return (
        <>

            <Card style={{ width: '30%', margin: 5}} key={ dev._id }>
            <Card.Header>{ dev.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <small><em>Name: { dev.name  }</em></small><br />
                    <small>LinkedIn: { dev.linkedin }</small><br />
                    <small>Github: { dev.github }</small><br />

                    {/* <Link to={`/projects/${project._id}`}>View { project.name }</Link> */}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
}

export default Dev