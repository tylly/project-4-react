import axios from 'axios'
import apiUrl from '../apiConfig'

export const createUrl = (data) => {
	return axios({
        url: `${apiUrl}/uploads`,
        method: 'POST',
        data
    })
}