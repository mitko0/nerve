import decode from "jwt-decode";

const LSService = {
    setItem: (name, value) => {
        window.localStorage.setItem(name, JSON.stringify(value));
    },

    getItem: (name = 'jwt') => {
        const strObj = window.localStorage.getItem(name);
        return JSON.parse(strObj);
    },

    getUsername: () => {
        const jwt = localStorage.getItem('jwt');
        let {sub} = decode(jwt);
        return sub;
    },

    checkToken: () => {
        const jwt = localStorage.getItem('jwt');
        const user = localStorage.getItem('user');
        if (!jwt) {
            return false;
        }
        try {
            let {exp} = decode(jwt);
            const mNow = new Date();
            const mExp = new Date(exp * 1000);
            console.log('now', mNow.toISOString());
            console.log('exp', mExp.toISOString());
            return (mNow.getTime() < mExp.getTime()) && user;
        } catch (e) {
            return false;
        }
    },

    removeItem: (name) => {
        localStorage.removeItem(name);
    },

    clearLS: () => {
        // localStorage.clear();
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
    }
};

export default LSService;