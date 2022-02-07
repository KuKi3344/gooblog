import axios from 'axios'

var base = '';

export function gethottag(){
	return axios({
		method:'get',
		url:`${base}/tag/public/hot`,
	})
}
export function getarticles(params) {
	return axios({
		method:'post',
		url:`${base}/article/public/all/new`,
		data:params
	})
}
export function hotArticles(params){
	return axios({
		method:'get',
		url:`${base}/article/public/hot/${params}`,
	})
}

export function newArticles(){
	return axios({
		method:'get',
		url:`${base}/article/public/new`,
	})
}

export function getallarchives(){
	return axios({
		method:'post',
		url:`${base}/article/public/archives`,
	})
}
export function findarticle(id){
	return axios({
		method:'post',
		url:`${base}/article/public/content/${id}`,
	})
}
export function getuser(){
	return axios({
		method:'get',
		url:`${base}/user/private/current`,
	})
}
export function logout(){
	return axios({
		method:'post',
		url:`${base}/public/logout`,
	})
}
export function tologin(params) {
	return axios({
		method:'post',
		url:`${base}/public/login`,
		data:params
	})
}
export function getcomment(id){
	return axios({
		method:'get',
		url:`${base}/comment/public/article/level1/all/${id}`,
	})
}
export function getrecall(id){
	return axios({
		method:'get',
		url:`${base}/comment/public/article/level2/all/${id}`,
	})
}
export function comment(params) {
	return axios({
		method:'post',
		url:`${base}/comment/private/create`,
		params:params
	})
}
export function recall(params) {
	return axios({
		method:'post',
		url:`${base}/comment/private/create`,
		params:params
	})
}
export function getallcategory(id){
	return axios({
		method:'get',
		url:`${base}/category/public/all`,
	})
}
export function getalltag(id){
	return axios({
		method:'get',
		url:`${base}/tag/public/all`,
	})
}
export function  publisharticle(params) {
	return axios({
		method:'post',
		url:`${base}/article/private/publish`,
		data:params
	})
}
export function  editarticle(params) {
	return axios({
		method:'post',
		url:`${base}/article/private/update`,
		data:params
	})
}
export function  deletecomment(id,fromUserId) {
	return axios({
		method:'post',
		url:`${base}/comment/private/delete`,
		params:{
			id:id,
			fromUserId:fromUserId,
		}
	})
}
