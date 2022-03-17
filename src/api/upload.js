import axios from 'axios'
var base = '';
export function upload(formdata) {
  return axios({
    headers: {'Content-Type': 'multipart/form-data'},
    url: `${base}/upload/private/image`,
    method: 'post',
    data: formdata
  })
}
