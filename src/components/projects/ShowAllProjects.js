import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// import LoadingScreen from '../shared/LoadingScreen'
import { getAllProjects } from '../../api/projects'
import messages from '../shared/AutoDismissAlert/messages'

// ShowAllProjects should make a request to the api
// To get all services
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ProjectIndex = (props) => {
    const [projects, setProjects] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in ShowAllProjects', props)

    useEffect(() => {
        console.log(props)
        getAllProjects()
            .then(res => setProjects(res.data.projects))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Services',
                    message: messages.getProjectsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    // If services haven't been loaded yet, show a loading message
    // if (!services) {
    //     return <LoadingScreen />
    // } else if (services.length === 0) {
    //     return <p>No services yet. Better add some.</p>
    // }

    if (error) {
        return <p>Error!</p>
    }
    console.log('here are our projects!', projects)

    const projectCards = projects.map(project => (
        <Card style={{ width: '30%', margin: 5}} key={ project._id }>
            <Card.Header>{ project.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <small><em> { project.description }</em></small><br />
                    <small>{ project.deployment }</small><br />
                    <small>Location: { project.front_end_repo }</small><br />
                    <small>${ project.back_end_repo }</small><br />

                    <Link to={`/projects/${project._id}`}>View { project.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { projectCards }
        </div>
    )
}

export default ProjectIndex