import axios from 'axios'

let base = '';

export function getarticles(params) {
	return axios({
		method:'post',
		url:`${base}/api/article/all`,
		data:params
	})
}
export function hotArticles(params){
	return axios({
		methods:'get',
		url:`${base}/api/article/hot/${params}`,
	})
}
export function newArticles(){
	return axios({
		methods:'get',
		url:`${base}/api/article/new`,
	})
}