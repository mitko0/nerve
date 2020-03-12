import decode from "jwt-decode";

const TokenService = {
    getToken: () => {
        return window.localStorage.getItem("jwt");
    },

    checkToken: () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return false;
        }
        try {
            let {exp} = decode(jwt);
            return exp < new Date().getTime();
        } catch (e) {
            return false;
        }
    },

    getUsername: () => {
        const jwt = localStorage.getItem('jwt');
        let {sub} = decode(jwt);
        return sub;
    }
};

export default TokenService;