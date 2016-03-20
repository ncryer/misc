app.factory('Auth', function(FURL, $firebaseAuth, $firebase){

  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    user: {},

    login: function(user){
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },

    signedIn: function(){
      return !!Auth.user.provider;
    }
  };

  // When user auths, store auth data in the user object
  auth.$onAuth(function(authData){
    if(authData){
      angular.copy(authData, Auth.user);
      // Set the profile
      Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
    } else {
      if(Auth.user && Auth.user.profile){
        Auth.user.profile.$destroy();
      }
      angular.copy({}, Auth.user);
    }
  });
  return Auth
});
