import axios from '../axios/Axios'
import qs from 'qs'
import ts from "./localStorage";

const UserService = {
    getUser: (id, username) => {
        return axios.get(`/api/users?id=${id}&username=${username}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        });
    },

    getAllUsers: () => {
        return axios.get('/api/users/all', {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        });
    },

    searchUsers: (term) => {
        return axios.get(`/api/users?term=${term}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        });
    },

    createUser: (user, pic) => {
        const data = {
            ...user,
            pic
        };
        const formParams = qs.stringify(data);
        return axios.post('/api/users', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },

    updateUser: (id, username, user) => {
        const data = {
            ...user
        };
        const formParams = qs.stringify(data);
        return axios.patch(`/api/users?id=${id}&username=${username}`, formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authentication': 'Bearer ' + ts.getToken()
            }
        });
    },

    /* updateProfilePic: () => {

     },*/

    deleteUser: (id, username) => {
        axios.delete(`/api/users/delete?id=${id}&username=${username}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        });
    }
};

export default UserService;