import axios from "axios";
const backend = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(backend);
    return request.then(response => response.data);   
}

const create = (person) => {
    const request = axios.post(backend, person);
    return request.then(response => response.data);
}

const remove = (id) => {
    const url = `${backend}/${id}`;
    return axios.delete(url)
}

const update = (updatedPerson) => {
    const url = `${backend}/${updatedPerson.id}`;
    return axios.put(url, updatedPerson);
}

export default {getAll, create, remove, update};