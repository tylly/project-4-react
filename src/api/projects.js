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
export const updateProject = (user,	projectId, updatedProject) => {
    console.log('this is updatedProject', updatedProject)
	return axios({
		url: `${apiUrl}/projects/${projectId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { project: updatedProject }
	})
}

// UPDATE - Add dev to project
export const addDevToProject = (user, projectId, devs) => {
	return axios({
		url: `${apiUrl}/projects/addDev/${projectId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { developers: devs }
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