import axios from '../axios/Axios';
import qs from 'qs';

const AuthenticationService = {
    authenticate: (auth) => {
        const data = {
            ...auth
        };
        const formParams = qs.stringify(data);
        return axios.post('/api/authenticate', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export default AuthenticationService;