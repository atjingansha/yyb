import axios from 'axios';
import { Message } from 'element-ui';


axios.interceptors.response.use(success => {
    if (success.status && success.status == 200) {
        if (success.data.code == 500) {
            Message.error({ message: success.data.message })
            return;
        }
        if (success.data.message) {
            Message.success({ message: success.data.message })
        }
    }
    return success.data
}, error => {
    Message.error("服务器访问错误")
    return;
})

let base = '';

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}


export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}


export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
//放入token
axios.interceptors.request.use(confifg => {
    if (window.sessionStorage.getItem('token')) {
        confifg.headers['Authorization'] =
            window.sessionStorage.getItem('token');
    }
    return confifg;
})

