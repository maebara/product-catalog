

class SessionStorage {
    constructor() {

    }

    setToken(token) {
        const expiresIn = new Date()
        expiresIn.setHours(expiresIn.getHours() + 12);
        window.localStorage.setItem("session", JSON.stringify({ token: token, expiresIn: expiresIn.getTime() }));
    }

    getToken() {
        const sessionObject = JSON.parse(localStorage.getItem("session"));
     
        if (!sessionObject || sessionObject.expiresIn < new Date().getTime()) {
            window.localStorage.setItem("session", null);
            return null
        }

        return sessionObject.token
    }
}

const sessionStorage = new SessionStorage();
export default sessionStorage