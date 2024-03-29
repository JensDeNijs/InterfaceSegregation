var User = /** @class */ (function () {
    function User() {
        this._password = 'user';
    }
    //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
    // Test it out by uncommenting the code below.
    User.prototype.checkGoogleLogin = function (token) {
        // return "this will not work";
        return (token === this._googleToken);
    };
    User.prototype.setGoogleToken = function (token) {
        this._googleToken = token;
    };
    User.prototype.getFacebookLogin = function (token) {
        return (token === this._facebookToken);
    };
    User.prototype.setFacebookToken = function (token) {
        this._facebookToken = token;
    };
    User.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    User.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return User;
}());
//admin cannot use google or facebook token
var Admin = /** @class */ (function () {
    function Admin() {
        this._password = 'admin';
    }
    Admin.prototype.checkGoogleLogin = function (token) {
        return false;
    };
    Admin.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    Admin.prototype.getFacebookLogin = function (token) {
        return false;
    };
    Admin.prototype.setFacebookToken = function () {
        throw new Error('Function not supported for admins');
    };
    Admin.prototype.setGoogleToken = function () {
        throw new Error('Function not supported for admins');
    };
    Admin.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return Admin;
}());
// class GoogleBot implements UserAuth {}
var GoogleBot = /** @class */ (function () {
    function GoogleBot() {
        this._password = 'bot';
    }
    GoogleBot.prototype.checkGoogleLogin = function (token) {
        return (token === this._googleToken);
    };
    GoogleBot.prototype.setGoogleToken = function (token) {
        this._googleToken = token;
    };
    GoogleBot.prototype.getFacebookLogin = function (token) {
        return false;
    };
    GoogleBot.prototype.setFacebookToken = function () {
        throw new Error('Function not supported for bots');
    };
    GoogleBot.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    GoogleBot.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return GoogleBot;
}());
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var loginAsBotElement = document.querySelector('#loginAsBot');
var resetPasswordElement = document.querySelector('#resetPassword');
var guest = new User;
var admin = new Admin;
var bot = new GoogleBot();
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    //let user = loginAsAdminElement.checked ? admin : guest;
    var user;
    if (loginAsAdminElement.checked) {
        user = admin;
    }
    else if (loginAsBotElement.checked) {
        user = bot;
    }
    else {
        user = guest;
    }
    if (!loginAsAdminElement.checked) {
        user.setGoogleToken('secret_token_google');
        if (!loginAsBotElement.checked) {
            user.setFacebookToken('secret_token_fb');
        }
    }
    debugger;
    var auth = false;
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
    }
    else {
        alert('login failed');
    }
});
resetPasswordElement.addEventListener('click', function (event) {
    event.preventDefault();
    // let user = loginAsAdminElement.checked ? admin : guest;
    var user;
    if (loginAsAdminElement.checked) {
        user = admin;
    }
    else if (loginAsBotElement.checked) {
        user = bot;
    }
    else {
        user = guest;
    }
    user.resetPassword();
});
