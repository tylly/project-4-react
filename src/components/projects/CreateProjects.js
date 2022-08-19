import { useState } from 'react'
import { createProject } from '../../api/projects'
import { useNavigate } from 'react-router-dom'
import { createProjectSuccess, createProjectFailure } from '../shared/AutoDismissAlert/messages'
import ProjectForm from '../shared/ProjectForm'
import axios from 'axios'
import '../../style.css'


const formStyle = {
    zIndex: "2"
}
const CreateProject = (props) => {
    //console.log('these are the props in createProject\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [project, setProject] = useState({
        name: '',
        description: '',
        tags: [],
        deployment: '',
        img: '',
        front_end_repo: '',
        back_end_repo: '',
        developers: []
    })



    const handleChange = (e) => {
        setProject(prevProject => {
            let updatedValue = e.target.value
            updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
            const updatedName = e.target.name

            //console.log('this is the input type', e.target.type)

            const updatedProject = {
                [updatedName]: updatedValue
            }
            return {
                ...prevProject,
                ...updatedProject
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response

    const handleSubmit = async (e) => {
        e.preventDefault();

        //AWS API call here?
        
        createProject(user, project)
        .then(res => {
            navigate(`/projects/${res.data.project._id}`)})
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: createProjectSuccess,
              variant: "success",
            })
          )
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: createProjectFailure,
              variant: "danger",
            })
          );
      };

    return (
      <>
      <ProjectForm 
      project={ project } 
      handleChange={ handleChange }
      handleSubmit={ handleSubmit }
      heading="Where to?"
      />
      </>
    )
}

export default CreateProject