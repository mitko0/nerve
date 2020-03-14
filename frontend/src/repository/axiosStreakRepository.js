import axios from '../axios/Axios'
import ts from "./localStorage";

const StreakService = {
    getStreak: (user1Id, user2Id) => {
        return axios.get('/api/streaks', {
            params: {
                user1Id,
                user2Id
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    getForUsername: (username) => {
        return axios.get('/api/streaks', {
            params: {
                username
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    getForId: (id) => {
        return axios.get('/api/streaks', {
            params: {
                'user-id': id
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    }
};

export default StreakService;