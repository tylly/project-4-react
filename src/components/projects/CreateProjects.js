import { useState, useRef } from 'react'
import { createProject } from '../../api/projects'
import { useNavigate } from 'react-router-dom'
import { createProjectSuccess, createProjectFailure } from '../shared/AutoDismissAlert/messages'
import ProjectForm from '../shared/ProjectForm'
import axios from 'axios'
import '../../style.css'
import { createUrl } from '../../api/aws'


const formStyle = {
  zIndex: "2",
};
const CreateProjects = (props) => {
  //console.log('these are the props in createProject\n', props)
  const { user, msgAlert } = props;

    const [file, setFile] = useState()
    const [ loading, setLoading ] = useState(null)

    const navigate = useNavigate()
    const myUrl = useRef("")
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

    function handleChangeFile(event) {
      console.log('IM AM IN THE FILE UPLOAD FUNCTION')
      setFile(event.target.files[0])
    }

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
        // If this is acting out comment out from here====>>>>
        console.log('IN THE HANDLE SUBMIT BEFORE FORMDATA')
        const data = new FormData()
        data.append('upload', file)
        setLoading(true)
        createUrl(data)
          .then(res => {
            myUrl.current = res.data.upload.url
            const image = myUrl.current
            setProject(prev => { 
              return {
                ...prev,
                img: image
              } 
            })
            console.log('AFTER SET PROJECT, THIS IS PROJECT\n', project)
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
          })
          .then(() => setLoading(true))
          .catch(err => {
            console.log(err)
            msgAlert({
              heading: "Error",
              message: createProjectSuccess,
              variant: "danger",
            })
          })

          // To here ============>>>>>>>>> and uncomment the buttom part
      //   createProject(user, project)
      //   .then(res => {
      //       navigate(`/projects/${res.data.project._id}`)})
      //     .then(() =>
      //       msgAlert({
      //         heading: "oh yea!",
      //         message: createProjectSuccess,
      //         variant: "success",
      //       })
      //     )
      //     .catch(() =>
      //       msgAlert({
      //         heading: "oh no!",
      //         message: createProjectFailure,
      //         variant: "danger",
      //       })
      //     );
    };

    return (
      <>
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


export default CreateProjects;
