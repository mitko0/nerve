import axios from '../axios/Axios'
import qs from 'qs'
import ts from "./localStorage";
import DateFormatter from "../formatter/dateFormatter";

const ResponseService = {
    newResponse: () => {

    },

    rateResponse: (id, rating) => {
        const data = {
            ...id,
            rating
        };
        const formParams = qs.stringify(data);
        return axios.post('/api/responses/rate', formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    getResponse: () => {

    },

    getResponsesForChallenge: (id) => {
        const iso = DateFormatter.formatIso(id.createDate);
        return axios.get(`/api/responses/challenge?senderId=${id.senderId}&receiverId=${id.receiverId}&challengeDate=${iso}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + ts.getToken()
            }
        })
    },

    deleteResponse: () => {

    },

    deletePublic: () => {

    }
};

export default ResponseService;