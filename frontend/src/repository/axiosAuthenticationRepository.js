import axios from '../axios/Axios';
import qs from 'qs';

const AuthenticationService = {
    authenticate: (auth) => {
        const formParams = qs.stringify(auth);
        return axios.post('/api/authenticate', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
};

export default AuthenticationService;