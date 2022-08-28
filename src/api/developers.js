import apiUrl from '../apiConfig'
import axios from 'axios'


// READ => INDEX
export const getAllDevelopers = () => {
    return axios(`${apiUrl}/developers`)
}

// READ => SHOW
export const getOneDeveloper = (id) => {
    return axios(`${apiUrl}/developers/${id}`)
}

// READ => get Dev to add to project
export const getOneDevByName = (name) => {
    return axios(`${apiUrl}/developers/name/${name}`)
}
export const getDevPfp = (linkUrl) => {
	return axios(linkUrl)
}
// CREATE
export const createDeveloper = (user, newDeveloper) => {
    console.log('hit')
	return axios({
		url: apiUrl + '/developers',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { developer: newDeveloper }
	})
}

// UPDATE - add project to dev
export const addProjectToDev = (user, projectId, devs) => {
	return axios({
		url: `${apiUrl}/developers/addProj/${projectId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { developers: devs}
	})
}

// UPDATE - remove project from dev
export const removeProjectFromDeveloper = (user, projectId, devs) => {
	return axios({
		url: `${apiUrl}/developers/delProj/${projectId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { developers: devs}
	})
}

// UPDATE
export const updateDeveloper = (user, devId, updatedDeveloper) => {
    console.log('this is updatedDeveloper', updatedDeveloper)
	return axios({
		url: `${apiUrl}/developers/${devId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { developer: updatedDeveloper }
	})
}

// DELETE
export const removeDeveloper = (user, developerId) => {
    return axios({
        url: `${apiUrl}/developers/${developerId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}