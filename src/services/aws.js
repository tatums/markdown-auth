//import AWS from 'aws-sdk'
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider'
import 'amazon-cognito-identity-js'

class AwsService {
  constructor() {
    this.bucket = 'markdown-tatum-author'
    this.userPoolId = 'us-east-1_BGU9CKFCM'
    this.clientId = '3q8g2135i3sn30g0cpo4bu4uop'
    this.identityPoolId = 'us-east-1:f08f199c-4e76-43b9-a819-364360943c84'

    this.userPool = new CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId : this.userPoolId,
      ClientId : this.clientId
    })

    this.currentUser = function () {
      return this.userPool.getCurrentUser()
    }

    this.getJwtToken = () => {
      return new Promise((resolve, reject) => {
        const cognitoUser = this.userPool.getCurrentUser();
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

    this.cognitoCredentials = (session) => {
      return new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.identityPoolId,
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

    this.cognitoUser = () => {
      const user = this.currentUser()
      return new Promise(function(resolve, reject){
        if (user != null) {
          user.getSession(function(err, session) {
            if (err) { return err }
            resolve(user)
          })
        }
      })

    }
  } // END of constructor

  listObjects (prefix) {
    return this.getJwtToken()
      .then(this.cognitoCredentials)
      .then(credentials => {
        AWS.config.credentials = credentials
        return this.refreshCredentials()
      })
      .then(Aws => {
        let s3 = new Aws.S3()
        return s3.listObjects(
          { Bucket: this.bucket, Prefix: prefix }
        ).promise();
      })
      .then(resp => { return resp.Contents })
      .catch(err => { console.log(err) })
  }

  putObject (key, body) {
    return this.getJwtToken()
      .then(this.cognitoCredentials)
      .then(credentials => {
        AWS.config.credentials = credentials
        return this.refreshCredentials()
      })
      .then(Aws => {
        let s3 = new Aws.S3()
        return s3.putObject({ Bucket: this.bucket, Key: key, Body: body })
          .promise()
      })
      .catch(err => { console.log(err) })
  }

  getObject (key) {
    return this.getJwtToken()
      .then(this.cognitoCredentials)
      .then(credentials => {
        AWS.config.credentials = credentials
        return this.refreshCredentials()
      })
      .then(Aws => {
        let s3 = new Aws.S3()
        return s3.getObject({ Bucket: this.bucket, Key: key }).promise();
      })
      .catch(err => { console.log(err) })
  }

  deleteObject (key) {
    return this.getJwtToken()
      .then(this.cognitoCredentials)
      .then(credentials => {
        AWS.config.credentials = credentials
        return this.refreshCredentials()
      })
      .then(Aws => {
        let s3 = new Aws.S3()
        return s3.deleteObject({ Bucket: this.bucket, Key: key }).promise();
      })
      .catch(err => { console.log(err) })
    }

  getUserFromLocal () {
    var cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
          return err
        }
        return session
      });
    }
  }

  changePassword (user, currentPassword, password, passwordConfirmation) {
    return new Promise(function(resolve, reject){
      user.changePassword(currentPassword, password, function(err, result) {
        if (err) { reject(err); return  }
        console.log('call result: ' + result);
        resolve(result)
      })
    })
  }

  signout () {
    let user = this.currentUser()
    user.signOut()
  }

  confirm (attr) {
    var cognitoUser = new AWS.CognitoIdentityServiceProvider.CognitoUser({
      Username : attr.username,
      Pool : this.userPool
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
    let authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: username,
      Password: password,
    });

    let cognitoUser = new CognitoIdentityServiceProvider.CognitoUser({
        Username : username,
        Pool : this.userPool
    });

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: this.identityPoolId,
            Logins : {
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM' : result.getIdToken().getJwtToken(),
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
      Pool : this.userPool
    });

    return new Promise((resolve, reject) => {
      this.userPool.signUp(attr.email, attr.password, attributeList, null, function(err, result){
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

AwsService.$inject = []
export default AwsService
