import ProjectForm from '../shared/ProjectForm'
import '../../style.css'


const formStyle = {
    zIndex: "2"
}
const CreateProjects = ({ user, msgAlert }) => {
    //console.log('these are the props in createProject\n', props)

    return (
      <>
        <ProjectForm
          user={user}
          msgAlert={msgAlert}
          heading="Where to?"
        />
      </>
    )
}

export default CreateProjects;
