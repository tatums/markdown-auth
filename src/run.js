run.$inject = ['$rootScope', '$state', 'jwtHelper', 'AwsService'];

var jws = require('jws-jwk')
var jwk = {
  "keys": [
    {
      "alg":"RS256",
      "e":"AQAB",
      "kid":"vyVQH7UMjwYboVvyFf+zd4KHZfgc+RtmU/A2vHhgITI=",
      "kty":"RSA",
      "n":"xXq59Wi8x2U1lkaaYIeYEHU2rvhk0DjG71mQpqoKKPlJbtdDNzlG1uGqzXlBD5oC6oXire6dvUilDCUm2oZJ-uDd2ZRkPgrsCeQ8qKZUaMD4927BsRAYrHXThSGD2EO1RUKwPO5-05fGdbtxGplHbHti-QuoAQWna31yuH-J7XAdBuEeA0qjJpxmHPYhS_CpMHwsVhBX8aiKhP50jhQ6GYpc0oXAWKyH41tIulvTIG6RnzCbolJREd7PXmKpHnHvVDo4LESovWb4sEC6q4oNxSzUtyYjHWZODVoSFxU44z4ljfBHdaESl-io_ilHJnJb3THI7RX3qD2o_nUjhxSpow",
      "use":"sig"
    },
    {
      "alg":"RS256",
      "e":"AQAB",
      "kid":"fUyIG0h6R5HFGfHDV8uebcRXldQ09dCZXbFKf6zy1rs=",
      "kty":"RSA",
      "n":"m3hoD5oKJq0208qHXVz2swznfFVeU5zWZhAiLKb0hs0bXYN2W9Gy7XklIjibN6ilOaHkL_tvgO_dSKLGJUemr_EVbRrbgu7dENDYgZwYr1CPMy146TIUFeZpqHF1Xh8BF_p7heGeVIP-HjIRgxwG81sknpeQRmxwozrnbbGySJoHClh_EP14z2C1NwSIB4xSFb6r1IOIIuy8vsYVkHd_IRGTK1cCX8f4iuzJ9cBQ1XnppkVGWlcW-m8aF0eDJb6gTK3jieHRqWTfd4I8S5qti6OK61pIlxp1JfJ8ZKgV1k7RDkyVXtA7U49RhBCLXzVdWi1X_SuQwjVMnnkvpo0O_w",
      "use":"sig"
    }
  ]
};

function tokenExpValid (token) {
  let decodedToken = jws.decode(token)
  let payload = JSON.parse(decodedToken.payload)
  return payload.exp > Date.now() / 1000
}

function tokenValid(user) {
  if (user) {
    let email = user.username
    let token = getIdToken(user.username)
    return jws.verify(token, jwk) && tokenExpValid(token)
  } else {
    return false
  }

}

function getIdToken(email) {
  const key = `CognitoIdentityServiceProvider.3q8g2135i3sn30g0cpo4bu4uop.${email}.idToken`
  return localStorage[key]
}


export default function run($rootScope, $state, jwtHelper, AwsService) {

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if ( toState.authenticate) {
      let user = AwsService.currentUser()

      if ( tokenValid(user) ) {
        console.log("YEP");
      } else {
        console.log('NEED TO LGOIN');
        $state.transitionTo('account.login');
        event.preventDefault();
      }
    } else {
      console.log('no auth necessary');
    }
  });

}
