import qs from 'qs';

import axios from '../axios/Axios'
import LSService from "./localStorage";

const UserService = {
    getUser: (id, username) => {
        return axios.get('/api/users', {
            params: {
                id,
                username
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

    getAllUsers: () => {
        return axios.get('/api/users/all', {
            headers: {
                'page-number': 0,
                'list-size': 5,
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

    searchUsers: (term = '') => {
        return axios.get('/api/users', {
            params: {
                term
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

    createUser: (username, email, password, pic) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        pic && formData.append('pic', pic);

        return axios.post('/api/users', formData);
    },

    updateUser: (oldPassword, id, name, username, email, password) => {
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        id && formData.append('id', id);
        name && formData.append('name', name);
        username && formData.append('username', username);
        email && formData.append('email', email);
        password && formData.append('password', password);

        return axios.patch('/api/users', formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

     updateProfilePic: ({id, name, pic} = {}) => {
         const formData = new FormData();
         id && formData.append('id', id);
         name && formData.append('name', name);
         formData.append('pic', pic);

         return axios.patch('/api/users/updatePic', formData, {
             headers: {
                 'Authorization': 'Bearer ' + LSService.getItem()
             }
         });
     },

    deleteUser: (id, username) => {
        return axios.delete('/api/users/delete', {
            params: {
                id, username
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

    deleteAll: ids => {
        const userIds = qs.stringify({userIds: ids}, { arrayFormat: 'comma' });
        return axios.delete(`/api/users?${userIds}`, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    }
};

export default UserService;