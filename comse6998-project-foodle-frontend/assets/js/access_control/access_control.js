// This js is for AWS Cognito

// Global variables
var poolData = {
  UserPoolId: _config.cognito.userPoolId,
  ClientId: _config.cognito.clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser = userPool.getCurrentUser();


// window.onload = function () {
//   if (getToken() !== undefined && getToken() !== 'invalid') {
//     token = getToken();
//     //   // Do something, e.g., call API Gateway
//   } else {
//     console.log('Redirect to home/register/login page');
//   }
//   // if (isCognitoUserSessionExist()) {
//   //   token = getToken();
//   //   // Do something
//   // } else {
//   //   console.log('Redirect to register/login page');
//   // }
// };


// registerButton
function registerButton() {
  var username;
  var password;
  var personalname;
  var poolData;

  personalname = document.getElementById("personalnameRegister").value;
  // username = document.getElementById("emailInputRegister").value;

  // if (document.getElementById("passwordInputRegister").value != document.getElementById("confirmationpassword").value) {
  //   alert("Passwords Do Not Match!");
  //   throw "Passwords Do Not Match!";
  // } else {
  //   password = document.getElementById("passwordInputRegister").value;
  // }

  password = document.getElementById("passwordInputRegister").value;

  var attributeList = [];

  // var dataEmail = {
  //   Name: 'email',
  //   Value: username, //get from form field
  // };

  var dataPersonalName = {
    Name: 'name',
    Value: personalname, //get from form field
  };

  // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  var attributePersonalName = new AmazonCognitoIdentity.CognitoUserAttribute(dataPersonalName);


  // attributeList.push(attributeEmail);
  attributeList.push(attributePersonalName);

  userPool.signUp(personalname, password, attributeList, null, function (err, result) {
    if (err) {
      alert(err.message || JSON.stringify(err));
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    //change elements of page
    // document.getElementById("titleheader").innerHTML = "Check your email for a verification link";
    // document.getElementById("titleheader").innerHTML = "Registration successfully";

    // Sign in immediately after successful registration
    var authenticationData = {
      Username: personalname,
      Password: password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);

        // Refresh to update the user session info, can also be redirect
        // location.reload();
        //to lex page
        location.replace('./chat.html');
      },

      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  });
}

// signInButton
function signInButton() {

  var authenticationData = {
    Username: document.getElementById("inputUsername").value,
    Password: document.getElementById("inputPassword").value,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var userData = {
    Username: document.getElementById("inputUsername").value,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);

      // Refresh to update the user session info, can also be redirect
      // location.reload();
      location.replace('./home.html');
      
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
}

// signOut
function signOut() {
  if (cognitoUser != null) {
    cognitoUser.signOut();
    console.log('Sign out');

    // Refresh to update the user session info, can also be redirect
    // location.reload();
    location.replace('./home.html');
  }
}

// Is any user logged in?
// function isCognitoUserSessionExist() {
//   if (cognitoUser != null) {
//     cognitoUser.getSession(function (err, session) {
//       if (err) {
//         console.log(err);
//         return false;
//       } else {
//         console.log('session validity: ' + session.isValid());
//         return true;
//       }
//     });
//   } else {
//     console.log('invalid');
//     return false;
//   }
// }

// Get token
var globalToken='invalid';
var globaluserid = 'invalid';
function getGlobalToken(){
  getToken();
  return globalToken;
}
function getGlobaluserid(){
  getToken();
  return globaluserid;
}
function getToken() {
  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.log(err);
        globalToken = 'invalid';
      }
      console.log('session validity: ' + session.isValid());
      // console.log(cognitoUser.getSignInUserSession());
      // console.log(cognitoUser.getSignInUserSession().getAccessToken());
      // console.log(cognitoUser.getSignInUserSession().getAccessToken().getJwtToken())
      globalToken = cognitoUser.getSignInUserSession().getAccessToken().getJwtToken();
      globaluserid = cognitoUser.getUsername();
    });
  } else {
    console.log('invalid');
    globalToken = 'invalid';
  }
}
function getUser() {
  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.log(err);
        return 'invalid';
      }
      console.log('session validity: ' + session.isValid());
      // console.log(cognitoUser.getUsername());
      // token = cognitoUser.getSignInUserSession().getAccessToken().getJwtToken();
      userId = cognitoUser.getUsername();
      // console.log(token);
      return userId;
    });
  } else {
    console.log('invalid');
    return 'invalid';
  }
}
