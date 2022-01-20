import axios from 'axios'

var base = '';

export function gethottag(){
	return axios({
		method:'get',
		url:`${base}/api/tag/hot`,
	})
}
export function getarticles(params) {
	return axios({
		method:'post',
		url:`${base}/api/article/all`,
		data:params
	})
}
export function hotArticles(params){
	return axios({
		method:'get',
		url:`${base}/api/article/hot/${params}`,
	})
}

export function newArticles(){
	return axios({
		method:'get',
		url:`${base}/api/article/new`,
	})
}

export function getallarchives(){
	return axios({
		method:'post',
		url:`${base}/api/article/archives`,
	})
}