import axios from '../axios/Axios'
import qs from 'qs'
import ts from "./localStorage";

const ChallengeService = {
    newChallenge: (challenge, endDate) => {
        const data = {
            ...challenge,
            endDate
        };
        const formParams = qs.stringify(data);
        return axios.post('/api/challenges', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    search: (username) => {
        return axios.get(`/api/challenges?username=${username}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    forUser: (searchBy, id = null, username = null) => {
        return axios.get(`/api/challenges/${searchBy}?id=${id}&username=${username}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    forDate: (when, date) => {
        return axios.get(`/api/challenges/${when}?date=${date}`, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    updateChallenge: (challenge, createDate, endDate) => {
        const data = {
            ...challenge,
            createDate,
            endDate
        };
        const formParams = qs.stringify(data);
        return axios.patch('/api/challenges', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    }
};

export default ChallengeService;