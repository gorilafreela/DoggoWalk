const TOKEN_KEY = 'token';
const SESSION_DATA_KEY = 'session_data';
export default class LocalStorageService {
    static get(key) {
        return localStorage.getItem(key);
    }

    static set(key, value) {
        localStorage.setItem(key, value);
    }

    static setToken(token) {
        this.set(TOKEN_KEY, token);
    }

    static getToken() {
        return this.get(TOKEN_KEY);
    }

    static isAuthenticated() {
        return this.getToken() != null;
    }

    static getAsJSON(key) {
        try {
            const val = this.get(key);
            if (val != null) {
                return JSON.parse(val);
            }
        } catch (err) {
            console.error(err);
        }
        return null;
    }
    static setAsJSON(key, value) {
        try {
            const val = JSON.stringify(value);
            this.set(key, val);
        } catch (err) {
            console.error(err);
        }

    }

    static setSessionData(data) {
        this.setAsJSON(SESSION_DATA_KEY, data);
    }

    static getSessionData() {
        return this.getAsJSON(SESSION_DATA_KEY);
    }

    static delete(key) {
        localStorage.removeItem(key);
    }

    static killSession() {
        this.delete(TOKEN_KEY);
        this.delete(SESSION_DATA_KEY);
    }
}