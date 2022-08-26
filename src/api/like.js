import apiUrl from '../apiConfig'
import axios from 'axios'

export const increaseLike = (user, projectId) => {
	return axios({
		method: 'POST',
		url: apiUrl + `/like/${projectId}`,
        headers: {
            Authorization: `Token token=${user.token}`,
        },
		data: {
		},
	})
}

export const decreaseLike = (user, projectId) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + `/like/${projectId}`,
        headers: {
            Authorization: `Token token=${user.token}`,
        },
		data: {
		},
	})
}