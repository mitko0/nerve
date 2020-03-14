import decode from "jwt-decode";

const TokenService = {
    setToken: (token) => {
        window.localStorage.setItem("jwt", token);
    },

    getToken: () => {
        return window.localStorage.getItem("jwt");
    },

    getUsername: () => {
        const jwt = localStorage.getItem('jwt');
        let {sub} = decode(jwt);
        return sub;
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

    deleteToken: () => {
        localStorage.removeItem('jwt');
    }
};

export default TokenService;