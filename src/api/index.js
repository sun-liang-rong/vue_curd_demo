import axios from 'axios'

axios.defaults.baseURL = ''
export const addUser = (data) => {
    return axios.post('/user', data).then(
        res => {
            return res.data
        }
    )
}

export const getList = (data) => {
    return axios.get('/user', {params: data}).then(
        res => {
            return res.data
        }
    )
}

export const delUser = (data) => {
    return axios.delete(`user/${data.id}`).then(
        res => {
            return res.data
        }
    )
}

export const updateUsr = (data) => {
    return axios.patch(`/user/${data.id}`, data).then(
        res => {
            return res.data
        }
    )
}