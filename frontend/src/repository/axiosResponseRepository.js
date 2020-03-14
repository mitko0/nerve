import axios from '../axios/Axios'
import ts from "./localStorage";
import DateFormatter from "../formatter/dateFormatter";

const ResponseService = {
    newResponse: (key, challengedDate, media, responderId) => {
        let formData = new FormData();
        formData.append('id.senderId', key.senderId);
        formData.append('id.receiverId', key.receiverId);
        formData.append('challengedDate', DateFormatter.formatIso(challengedDate));
        formData.append('media', media);
        formData.append('responderId', responderId);

        return axios.post('/api/responses', formData, {
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
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
                'Authorization': 'Bearer ' + ts.getToken()
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
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    getResponsesForChallenge: (senderId, receiverId, challengeDate) => {
        return axios.get('/api/responses/challenge?', {
            params: {
                senderId,
                receiverId,
                challengeDate: DateFormatter.formatIso(challengeDate)
            },
            headers: {
                'Authorization': 'Bearer ' + ts.getToken()
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
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    }
};

export default ResponseService;