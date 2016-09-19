AWSCognito.config.region = 'us-east-1'
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:df8e95ef-5242-4ef7-92e1-c0d86963d2a6',
})

AWSCognito.config.update({
  accessKeyId: 'anything',
  secretAccessKey: 'anything'
})

const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
  UserPoolId : 'us-east-1_BGU9CKFCM',
  ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
})

export default class AwsService {

  constructor() { }

  currentUser () {
    return userPool.getCurrentUser()
  }

  signout () {
    let user = this.currentUser()
    user.signOut()
  }

  confirm (attr) {
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : attr.username,
      Pool : userPool
    });

    cognitoUser.confirmRegistration(attr.confirmCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    })
  }



  auth (username, password) {

    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username : username,
      Password : password,
    })

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : username,
      Pool : userPool
    })

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken()
          })

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:df8e95ef-5242-4ef7-92e1-c0d86963d2a6',
            UserPoolId : 'us-east-1_BGU9CKFCM',
            Logins : {
              // Change the key below according to the specific region your user pool is in.
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM' : result.getIdToken().getJwtToken()
            }
          })

          resolve({
            success: true,
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken()
          })
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
        },
        onFailure: function(err) {
          reject({
            success: false,
            err: err
          })
        },
      });
    })
  }

  signup (attr) {
    let attributeList = [];
    let dataEmail = {
      Name : 'email',
      Value : attr.email
    };

    let dataPhoneNumber = {
      Name : 'phone_number',
      Value : '+15555555555'
    };

    let dataGivenName = {
      Name : 'given_name',
      Value : attr.firstName
    };

    let dataFamilyName = {
      Name : 'family_name',
      Value : attr.lastName
    };
    let attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    let attributeGivenName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGivenName);
    let attributeFamilyName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeGivenName);
    attributeList.push(attributeFamilyName);

    let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : attr.email,
      Pool : userPool
    });

    return new Promise((resolve, reject) => {
      userPool.signUp(attr.email, attr.password, attributeList, null, function(err, result){
        if (result) {
          cognitoUser = result.user
          resolve({
            success: true,
            user: result.user
          })
        } else {
          reject({
            success: false,
            err: err
          })
        }
      })
    })

  }

}

AwsService.$inject = [];
