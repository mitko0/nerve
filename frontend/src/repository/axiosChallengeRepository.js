import qs from 'qs'

import axios from '../axios/Axios'
import ts from "./localStorage";
import DateFormatter from "../formatter/dateFormatter";

const getChallenge = (challenge) => {
    return {
        id: {
            senderId: challenge.senderId,
            receiverId: challenge.receiverId
        },
        description: challenge.description,
        endDateTime: DateFormatter.formatIso(challenge.endDate),
        createDateTime: DateFormatter.formatIso(challenge.createDate)
    };
};

const ChallengeService = {
    newChallenge: (challenge) => {
        const data = getChallenge(challenge);
        const formData = qs.stringify(data, {allowDots: true});

        return axios.post('/api/challenges', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    search: (username = '') => {
        return axios.get('/api/challenges/search', {
            params: {
                username
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken(),
            }
        })
    },

    forUser: (searchBy = 'for', id, username) => {
        return axios.get(`/api/challenges/${searchBy}`, {
            params: {
                id,
                username
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    forDate: (when = 'before', date = new Date()) => {
        const iso = DateFormatter.formatIso(date);

        return axios.get(`/api/challenges/${when}`, {
            params: {
                date: iso
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    updateChallenge: (challenge) => {
        const data = getChallenge(challenge);
        const formData = qs.stringify(data, {allowDots: true});

        return axios.patch('/api/challenges', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    }
};

export default ChallengeService;