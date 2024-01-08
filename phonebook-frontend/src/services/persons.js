import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  let  request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  let request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  let request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {  getAll, create, update, deleteById }