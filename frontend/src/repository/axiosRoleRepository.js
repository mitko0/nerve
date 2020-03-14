import axios from '../axios/Axios'
import ts from "./localStorage";

const RoleService = {
    newRole: (roleName) => {
        const formData = new FormData();
        formData.append('roleName', roleName);
        return axios.post('/api/roles', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
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
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    allRoles: () => {
        return axios.get('/api/roles/all', {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    search: (name) => {
        return axios.get('/api/roles', {
            params: {
                name
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    usersWithRole: (name) => {
        return axios.get(`/api/roles/${name}/users`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
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
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    promoteUser: (roleId, userId) => {
        const formData = new FormData();
        formData.append('role-id', roleId);
        formData.append('user-id', userId);

        return axios.post(`/api/roles/promote-user`, formData, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    demoteUser: (roleId, userId) => {
        const formData = new FormData();
        formData.append('role-id', roleId);
        formData.append('user-id', userId);

        return axios.post('/api/roles/demote-user', formData, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    }
};

export default RoleService;