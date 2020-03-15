import axios from '../axios/Axios'
import LSService from "./localStorage";

const RoleService = {
    newRole: (roleName) => {
        const formData = new FormData();
        formData.append('roleName', roleName);
        return axios.post('/api/roles', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getRole: (id, roleName) => {
        return axios.get('/api/roles', {
            params: {
                id,
                'role-name': roleName
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    allRoles: () => {
        return axios.get('/api/roles/all', {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    search: (name) => {
        return axios.get('/api/roles', {
            params: {
                name
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    usersWithRole: (name) => {
        return axios.get(`/api/roles/${name}/users`, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    deleteRole: (id, roleName) => {
        return axios.delete('/api/roles', {
            params: {
                id,
                'role-name': roleName
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    promoteUser: (roleId, userId) => {
        const formData = new FormData();
        formData.append('role-id', roleId);
        formData.append('user-id', userId);

        return axios.post(`/api/roles/promote-user`, formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    demoteUser: (roleId, userId) => {
        const formData = new FormData();
        formData.append('role-id', roleId);
        formData.append('user-id', userId);

        return axios.post('/api/roles/demote-user', formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    }
};

export default RoleService;