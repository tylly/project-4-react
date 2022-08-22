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
export const updateDeveloperWithProject = (user, projectId, devId) => {
	return axios({
		url: `${apiUrl}/developers/addProj/${projectId}/${devId}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			developer: {
				_id: devId
			}
		}
	})
}
// UPDATE
export const updateDeveloper = (user, updatedDeveloper) => {
    console.log('this is updatedDeveloper', updatedDeveloper)
	return axios({
		url: `${apiUrl}/projects/${updatedDeveloper._id}`,
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