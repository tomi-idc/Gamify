import { observable, action } from 'mobx'
import * as firebase from "firebase/app";

// Add our Firebase services that we use.
import "firebase/auth";
import "firebase/firestore";
import handleErrors from './HandleErrors';

let firebaseConfig = {
    apiKey: "AIzaSyBD1Qfr9-egbG5YoZ08za79avGlfrY9vJs",
    authDomain: "gamify-21595.firebaseapp.com",
    databaseURL: "https://gamify-21595.firebaseio.com",
    projectId: "gamify-21595",
    storageBucket: "",
    messagingSenderId: "875603833770",
    appId: "1:875603833770:web:85e048782317a1fe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

class AuthModel {
    @observable message = '';

    getUserId(fn) {
        if (firebase.auth().currentUser != null) {
            fn(firebase.auth().currentUser.uid)
            return
        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                fn(user.uid)
            }
        });
    }

    getUser(fn) {
        if (firebase.auth().currentUser != null) {
            fn(firebase.auth().currentUser)
            return
        }
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                fn(user)
            }
        });
    }

    verifyDetails(loginDetails) {
        if (loginDetails.email === "" && loginDetails.password === "") {
            this.message = '*An Email and a password were not given.';
            return false;
        }
        if (loginDetails.email === "") {
            this.message = '*An email was not given.';
            return false;
        }
        if (loginDetails.password === "") {
            this.message = '*A password was not given.';
            return false;
        }
        return true
    }

    getAdminDetailsIfNeeded(loginDetails) {
        if (loginDetails.email === "admin" && loginDetails.password === "admin") {
            // Set email and password because Firebase auth doesn't allow admin/admin
            loginDetails.email = "admin@gamifyherokuapp.com"
            loginDetails.password = "adminsPassword"
        }
        return loginDetails
    }

    @action performLogin(loginDetails, rememberMe, fn) {
        loginDetails = this.getAdminDetailsIfNeeded(loginDetails)
        if (!this.verifyDetails(loginDetails)) {
            return;
        }
        let that = this;
        firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password).then(user => {
            return user.user.getIdToken().then(idToken => {
                fetch("http://localhost:3000/api/token/", {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify({ idToken: idToken }),
                    headers: { 'Content-Type': 'application/json' }
                    ,
                }).then(response => response.json())
                    .then(_ => {
                        const csrfToken = getCookie('csrfToken')
                        fetch("http://localhost:3000/api/sign_in/", {
                            method: "POST",
                            credentials: 'include',
                            body: JSON.stringify({ id: user.user.uid, idToken: idToken, rememberMe: rememberMe, csrfToken: csrfToken }),
                            headers: { 'Content-Type': 'application/json' }
                            ,
                        }).then(response => response.json())
                            .then(_ => fn())
                    })
            })
        }).catch(function (error) {
            that.message = '*' + error.message;
        });
    }

    @action performRegister(loginDetails, rememberMe, fn) {
        loginDetails = this.getAdminDetailsIfNeeded(loginDetails)
        if (!this.verifyDetails(loginDetails)) {
            return;
        }
        let that = this;
        firebase.auth().createUserWithEmailAndPassword(loginDetails.email, loginDetails.password).then(async user => {
            const idToken = await user.user.getIdToken();
            fetch("http://localhost:3000/api/token/", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify({ idToken: idToken }),
                headers: { 'Content-Type': 'application/json' },
            }).then(response => response.json())
                .then(_ => {
                    const csrfToken = getCookie('csrfToken');
                    fetch("http://localhost:3000/api/create_user/", {
                        method: "POST",
                        credentials: 'include',
                        body: JSON.stringify({ id: user.user.uid, email: loginDetails.email, idToken: idToken, rememberMe: rememberMe, csrfToken: csrfToken }),
                        headers: { 'Content-Type': 'application/json' },
                    }).then(response_1 => response_1.json())
                        .then(__1 => fn());
                });
        }).catch(function (error) {
            that.message = '*' + error.message;
        });
    }

    getErrorMessage() {
        return this.message
    }

    @action clearMessage() {
        this.message = ""
    }

    verifyCookie(callback) {
        fetch("http://localhost:3000/api/verify_cookie", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => handleErrors(response, callback))
            .then(response => {
            })
    }

    changePassword(first, second, fn) {
        if (first !== second) {
            this.message = "*The passwords do not match."
            return
        }
        if (first.length === 0) {
            this.message = "*The new password is empty."
            return
        }
        let that = this
        this.getUser(user => {
            user.updatePassword(first).then(function () {
                fn()
            }).catch(function (error) {
                that.message = "*An error has occurred."
            });
        })
    }
}

export default AuthModel