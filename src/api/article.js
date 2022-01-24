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
		url:`${base}/article/all`,
		data:params
	})
}
export function hotArticles(params){
	return axios({
		method:'get',
		url:`${base}/article/hot/${params}`,
	})
}

export function newArticles(){
	return axios({
		method:'get',
		url:`${base}/article/new`,
	})
}

export function getallarchives(){
	return axios({
		method:'post',
		url:`${base}/article/archives`,
	})
}
export function findarticle(id){
	return axios({
		method:'post',
		url:`${base}/article/content/${id}`,
	})
}
export function getuser(){
	return axios({
		method:'get',
		url:`${base}/api/sys-user/current`,
	})
}
export function logout(){
	return axios({
		method:'post',
		url:`${base}/logout`,
	})
}
export function tologin(params) {
	return axios({
		method:'post',
		url:`${base}/login`,
		data:params
	})
}
export function getcomment(id){
	return axios({
		method:'get',
		url:`${base}/comment/article/level1/all/${id}`,
	})
}
export function getrecall(id){
	return axios({
		method:'get',
		url:`${base}/comment/article/level2/all/${id}`,
	})
}