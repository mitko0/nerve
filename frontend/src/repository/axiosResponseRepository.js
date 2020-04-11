import axios from '../axios/Axios'
import LSService from "./localStorage";
import DateFormatter from "../formatter/DateFormatter";

const ResponseService = {
    newResponse: (senderId, receiverId, challengedDate, media, responderId) => {
        console.log(DateFormatter.formatIso(challengedDate));

        let formData = new FormData();
        formData.append('id.senderId', senderId);
        formData.append('id.receiverId', receiverId);
        formData.append('challengedDate', DateFormatter.formatIso(challengedDate));
        formData.append('media', media);
        formData.append('responderId', responderId);

        return axios.post('/api/responses', formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        });
    },

    rateResponse: (id, rating) => {
        let formData = new FormData();
        formData.append('senderId', id.senderId);
        formData.append('receiverId', id.receiverId);
        formData.append('createDate', DateFormatter.formatIso(id.createDate));
        formData.append('rating', rating);

        return axios.patch('/api/responses/rate', formData, {
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getResponse: (senderId, receiverId, createDate) => {
        return axios.get('/api/responses', {
            params: {
                senderId,
                receiverId,
                createDate: DateFormatter.formatIso(createDate)
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getResponsesForChallenge: (senderId, receiverId, challengeDate) => {
        return axios.get('/api/responses/challenge', {
            params: {
                senderId,
                receiverId,
                challengeDate: DateFormatter.formatIso(challengeDate)
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    getResponsesForChallengeWithUser: (senderId, receiverId, challengeDate) => {
        return axios.get(`/api/responses/challenge-with-user`, {
            params: {
                senderId,
                receiverId,
                challengeDate: DateFormatter.formatIso(challengeDate)
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    },

    deleteResponse: (senderId, receiverId, createDate) => {
        return axios.delete('/api/responses', {
            params: {
                senderId,
                receiverId,
                createDate: DateFormatter.formatIso(createDate)
            },
            headers: {
                'Authorization': 'Bearer ' + LSService.getItem()
            }
        })
    }
};

export default ResponseService;