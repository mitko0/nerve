import axios from '../axios/Axios'
import qs from 'qs'

const RoleService = {
    newRole: (role) => {
        const data = {
            ...role
        };
        const formParams = qs.stringify(data);
        return axios.post('/api/roles', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXRrby4xIiwiZXhwIjoxNTgzNjcxNTE1LCJpYXQiOjE1ODM2NzEyMTV9.IAyI2abkrk4YGpHTSbKSQ8U4NpE_P6OzSU3iMGZZweg',
            }
        })
    }
};

export default RoleService;