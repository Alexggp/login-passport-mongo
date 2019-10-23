module.exports = {
  mongodb: {
    URI: 'mongodb://localhost:27017/node-login'
  }, 
  facebook: {
    clientID: '1329744900537974',
    clientSecret: 'ee6bbc1c602896612f8c24407b51eb37',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'emails', 'displayName', 'picture']
  }
}