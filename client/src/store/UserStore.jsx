import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._IsAuth = false;
        this._user = {};
        this._IsAdmin = true;
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._IsAuth = bool;
    }
    setIsAdmin(bool) {
        this._IsAdmin = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._IsAuth;
    }
    get user() {
        return this._user;
    }
    get isAdmin() {
        return this._IsAdmin;
    }
}
