import axios from 'axios'
import { BASE_URL, API_KEY } from '../constants/api'

type TMethod = 'get' | 'post' | 'put' | 'delete'

axios.interceptors.request.use(
	config => {
		// eslint-disable-next-line
		config.headers['x-api-key'] = API_KEY

		return config
	},
	error => Promise.reject(error)
)

export const apiHelper = async (
	method: TMethod,
	url: string,
	...args: any[]
) => {
	console.log('args', ...args)
	const { data } = await axios[method](`${BASE_URL}/${url}`, ...args)
	console.log('data 9999999999999999999', data)
	return data
}
