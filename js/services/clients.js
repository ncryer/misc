app.factory('ClientService', function(Utils, FURL, $window, $firebaseArray, Auth, $q, $firebaseRef){

  var ref = new Firebase(FURL);
  var cache = Utils.cache.get('dataCache');
  var gymMemberRef = ref.child('gym').child(cache.gym).child("members");
  var profileRef = ref.child("profile");

  var ClientService = {
    profileRef: profileRef,
    gymMemberRef: gymMemberRef,
    members: $firebaseArray(gymMemberRef),

    addMember: function(member){
      // TODO: This whole thing needs to be a promise
      // User is supplied by front-end... should really register a profile too
      this.profileRef.orderByChild('email').equalTo(member.email).once('value', function(snapshot){
        if(snapshot.exists()){
          // User is already registered in rollcall, update the gym field
          var keyName = Object.keys(snapshot.val())[0];
          var memberRef = profileRef.child(keyName).ref();
          memberRef.update({gym: cache.gym});
          member.uid = keyName;
          // This is where Stripe integration eventually goes TODO!
          return gymMemberRef.child(uid).set(member);
        } else {
          // User does not exist in the system, should registered
          member.gym = cache.gym;
          member.fullname = member.firstName + " " + member.lastName;
          Auth.register(member).then(function(uid){
            // Member registered in Firebase Auth and Profile, now added to gym
            return gymMemberRef.child(uid).set(member);
          });
        }
      });
    },

    getMember: function(uid){
      return ref.child('profile').child(uid);
    },

    saveMemberEdit: function(member){
      // When editing members, details must be saved to profile and gym.members
      var deferred = $q.defer();
      // member is a $firebaseObject
      member.$save().then(function(){
        var memberObj = Utils.getObject(member);
        gymMemberRef.child(member.$id).set(memberObj).then(function(){
          deferred.resolve();
        });
      });
      return deferred.promise;
    }

  };

  return ClientService;
});
