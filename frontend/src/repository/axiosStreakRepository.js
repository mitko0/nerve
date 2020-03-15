import axios from '../axios/Axios'
import LSService from "./localStorage";

const StreakService = {
    getStreak: (user1Id, user2Id) => {
        return axios.get('/api/streaks', {
            params: {
                user1Id,
                user2Id
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getForUsername: (username) => {
        return axios.get('/api/streaks', {
            params: {
                username
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getForId: (id) => {
        return axios.get('/api/streaks', {
            params: {
                'user-id': id
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    }
};

export default StreakService;