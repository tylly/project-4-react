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