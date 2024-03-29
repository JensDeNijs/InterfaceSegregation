interface UserAuth {
    checkPassword(password: string): boolean;

    resetPassword();
}

interface UserFBAuth {
    setFacebookToken(token: string);

    getFacebookLogin(token: string): boolean;
}

interface UserGOAuth {
    setGoogleToken(token: string);

    checkGoogleLogin(token: string): boolean;
}

class User implements UserAuth, UserFBAuth, UserGOAuth {
    private _password: string = 'user';
    private _facebookToken: string;
    private _googleToken: string;

    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    checkGoogleLogin(token) {
        // return "this will not work";
        return (token === this._googleToken);
    }

    setGoogleToken(token: string) {
        this._googleToken = token;
    }

    getFacebookLogin(token) {
        return (token === this._facebookToken);
    }

    setFacebookToken(token: string) {
        this._facebookToken = token;
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

//admin cannot use google or facebook token
class Admin implements UserAuth {
    private _password: string = 'admin';

    checkGoogleLogin(token: string): boolean {
        return false;
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    getFacebookLogin(token: string): boolean {
        return false;
    }

    setFacebookToken() {
        throw new Error('Function not supported for admins');
    }

    setGoogleToken() {
        throw new Error('Function not supported for admins');
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

// class GoogleBot implements UserAuth {}
class GoogleBot implements UserAuth, UserGOAuth {
    private _password: string = 'bot';
    private _googleToken: string;

    checkGoogleLogin(token) {
        return (token === this._googleToken);
    }

    setGoogleToken(token: string) {
        this._googleToken = token;
    }

    getFacebookLogin(token: string): boolean {
        return false;
    }

    setFacebookToken() {
        throw new Error('Function not supported for bots');
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }

}

const passwordElement = <HTMLInputElement>document.querySelector('#password');
const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
const loginAsBotElement = <HTMLInputElement>document.querySelector('#loginAsBot');
const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');

let guest = new User;
let admin = new Admin;
let bot = new GoogleBot();

document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    //let user = loginAsAdminElement.checked ? admin : guest;
    let user;
    if (loginAsAdminElement.checked) {
        user = admin;
    } else if (loginAsBotElement.checked) {
        user = bot;
    } else {
        user = guest;
    }

    if (!loginAsAdminElement.checked) {
        user.setGoogleToken('secret_token_google');
        if (!loginAsBotElement.checked) {
            user.setFacebookToken('secret_token_fb');
        }
    }
    debugger;

    let auth = false;
    switch (true) {
        case typePasswordElement.checked:
            auth = user.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked:
            auth = user.checkGoogleLogin('secret_token_google');
            break;
        case typeFacebookElement.checked:
            debugger;
            auth = user.getFacebookLogin('secret_token_fb');
            break;
    }

    if (auth) {
        alert('login success');
    } else {
        alert('login failed');
    }
});

resetPasswordElement.addEventListener('click', (event) => {
    event.preventDefault();

   // let user = loginAsAdminElement.checked ? admin : guest;
    let user;
    if (loginAsAdminElement.checked) {
        user = admin;
    } else if (loginAsBotElement.checked) {
        user = bot;
    } else {
        user = guest;
    }
    user.resetPassword();
});