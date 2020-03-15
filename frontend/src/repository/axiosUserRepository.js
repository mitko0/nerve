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
        formData.append('pic', pic);

        return axios.post('/api/users', formData);
    },

    updateUser: (id, name, username, email, password) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        return axios.patch('/api/users', formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

     updateProfilePic: (id, name, pic) => {
         const formData = new FormData();
         formData.append('id', id);
         formData.append('name', name);
         formData.append('pic', pic);

         return axios.patch('/api/users/updatePic', formData, {
             headers: {
                 'Authorization': 'Bearer ' + LSService.getItem()
             }
         });
     },

    deleteUser: (id, username) => {
        axios.delete('/api/users/delete', {
            params: {
                id, username
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    }
};

export default UserService;