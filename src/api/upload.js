import axios from 'axios'

export function upload(formdata) {
  return axios({
    headers: {'Content-Type': 'multipart/form-data'},
    url: '/upload/private/image',
    method: 'post',
    data: formdata
  })
}
