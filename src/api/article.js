import axios from 'axios'

let base = '';

export function getarticles(params) {
	return axios({
		method:'post',
		url:`${base}/api/article/all`,
		data:params
	})
}
