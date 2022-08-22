import ProjectForm from '../shared/ProjectForm'
import '../../style.css'


const formStyle = {
    zIndex: "2"
}
const CreateProjects = ({ user, msgAlert }) => {
    //console.log('these are the props in createProject\n', props)

    return (
      <>
<<<<<<< HEAD
      <ProjectForm 
      project={ project } 
      handleChange={ handleChange }
      handleSubmit={ handleSubmit }
      handleChangeFile={ handleChangeFile }
      heading="Where to?"
      />

      </>
    )
}

=======
        <ProjectForm
          user={user}
          msgAlert={msgAlert}
          heading="Where to?"
        />
      </>
    )
}
>>>>>>> 96a42d7bba6930f5899fc354ed9121aeb5b48d89

export default CreateProjects;
