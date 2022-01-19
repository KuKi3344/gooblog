import axios from 'axios'

let base = 'http://49.234.38.85:2235';

export function getarticles(params) {
	return axios({
		method:'post',
		url:`${base}/article`,
		data:params
	})
}
