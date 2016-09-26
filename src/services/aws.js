import AWS from 'aws-sdk'
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider'
import 'amazon-cognito-identity-js'

const userPool = new CognitoIdentityServiceProvider.CognitoUserPool({
  UserPoolId : 'us-east-1_BGU9CKFCM',
  ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
})

export default class AwsService {

  constructor() {
    this.userPool = new CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId : 'us-east-1_BGU9CKFCM',
      ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
    })

    this.currentUser = function () {
      return userPool.getCurrentUser()
    }

    this.getJwtToken = () => {
      return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
          cognitoUser.getSession(function(err, session) {
            if (err) { reject(err) }
            resolve(session)
          });
        } else {
          reject('no cognito user')
        }
      })
    }

    this.layout = (id) => {
      return this.getJwtToken()
        .then(this.cognitoCredentials)
        .then(credentials => {
          AWS.config.credentials = credentials
          return this.refreshCredentials()
        })
        .then(aws => { return this.getObject(id) })
        .catch(err => { console.log(err) })
    }

    this.layouts = () => {
      return this.getJwtToken()
        .then(this.cognitoCredentials)
        .then(credentials => {
          AWS.config.credentials = credentials
          return this.refreshCredentials()
        })
        .then(this.getBucketLayouts)
        .then(resp => { return resp.Contents })
        .catch(err => { console.log(err) })
    }

    this.getObject = (key) => {
      const s3 = new AWS.S3()
      return s3.getObject({ Bucket: 'dietsmarts.info', Key: key }).promise();
    }

    this.getBucketLayouts = () => {
      const s3 = new AWS.S3()
      return s3.listObjects({ Bucket: 'dietsmarts.info', Prefix: 'layouts' }).promise();
    }

    this.cognitoCredentials = (session) => {
      return new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:f08f199c-4e76-43b9-a819-364360943c84',
        Logins : {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM' : session.getIdToken().getJwtToken()
        }
      });
    }

    this.refreshCredentials = () => {
      return new Promise((resolve, reject) => {
        AWS.config.region = 'us-east-1'
        AWS.config.credentials.refresh((err) => {
          if (err) reject(err)
          resolve(AWS)
        })
      })
    }

  }


  getUserFromLocal () {
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          console.log(err)
          return err
        }
        return session
      });
    }

  }


  signout () {
    let user = this.currentUser()
    user.signOut()
  }

  confirm (attr) {
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser({
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
    var authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    var userPool = new CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId : 'us-east-1_BGU9CKFCM',
      ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
    });

    var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser({
        Username : username,
        Pool : userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:f08f199c-4e76-43b9-a819-364360943c84',
            Logins : {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM' : result.getIdToken().getJwtToken()
            }
          })
          resolve({
            success: true, accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken()
          })
        },
        onFailure: function(err) {
          reject({ success: false, err: err })
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
    let attributeEmail = new CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    let attributeGivenName = new CognitoIdentityServiceProvider.CognitoUserAttribute(dataGivenName);
    let attributeFamilyName = new CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeGivenName);
    attributeList.push(attributeFamilyName);

    let cognitoUser = new CognitoIdentityServiceProvider.CognitoUser({
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
