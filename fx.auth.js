class FxAuth {
    isAuthenticated() {
        const isAuthenticated = this.getUserId() !== null && this.getToken() !== null;
        return isAuthenticated;
    }

    getToken() {
        return sessionStorage.getItem('bearerToken');
    }

    getUserId() {
        return sessionStorage.getItem('userId');
    }

    getUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    getLoginUrl(){
        return '/';
    }

    authenticate(data) {
        const { account, token } = data;
        sessionStorage.setItem('userId', account.id);
        sessionStorage.setItem('user', JSON.stringify(account));
        sessionStorage.setItem('bearerToken', token);
    }

    signout() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('bearerToken');
        sessionStorage.removeItem('userHasProfile');
    }
}
export const fxAuth = new FxAuth();