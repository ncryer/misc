app.factory('Auth', function(FURL, $firebaseAuth, $firebaseObject, $window){

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
    },

    logout: function(){
      return auth.$unauth;
    },

    randomPassword: function(length) {
      var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
      var pass = "";
      for (var x = 0; x < length; x++) {
          var i = Math.floor(Math.random() * chars.length);
          pass += chars.charAt(i);
      }
      return pass;
    },

    createProfile: function(uid, user){
      // Creates a user profile
      var profileRef = ref.child('profile').child(uid);
      var profile = {
        email: user.email,
        password: user.password,
        gym: user.gym,
        role: 'client'
      };
      return profileRef.set(profile);
    },

    register: function(member){
      if(!member.password){
        member.password = this.randomPassword(10);
      }
      return auth.$createUser(member).then(function(data){
        return Auth.createProfile(data.uid, member);
      });
    },
  };

  // When user auths, store auth data in the user object
  auth.$onAuth(function(authData){
    if(authData){
      angular.copy(authData, Auth.user);
      // Set the profile
      // Auth.user.profile = $firebase(ref.child('profile').child(authData.uid)).$asObject();
      Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));
      Auth.user.profile.$loaded().then(function(profile){
        $window.localStorage['gym-key'] = profile.gym.toString();
      });
    } else {
      if(Auth.user && Auth.user.profile){
        Auth.user.profile.$destroy();
      }
      // angular.copy({}, Auth.user);

    }
  });

  return Auth;
});
