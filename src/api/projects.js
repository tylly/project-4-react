import apiUrl from '../apiConfig'
import axios from 'axios'


// READ => INDEX
export const getAllProjects = () => {
    return axios(`${apiUrl}/projects`)
}

// READ => SHOW
export const getOneProject = (id) => {
    return axios(`${apiUrl}/projects/${id}`)
}

// CREATE
export const createProject = (user, newProject) => {
    console.log('hit')
	return axios({
		url: apiUrl + '/projects',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { project: newProject }
	})
}
// UPDATE
export const updateProject = (user, updatedProject) => {
    console.log('this is updatedProject', updatedProject)
	return axios({
		url: `${apiUrl}/projects/${updatedProject._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { project: updatedProject }
	})
}

// DELETE
export const removeProject = (user, projectId) => {
    return axios({
        url: `${apiUrl}/projects/${projectId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}