app.factory('ClientService', function(FURL, $window, $firebaseArray, Auth){

  var ref = new Firebase(FURL);
  var gymKey = $window.localStorage['gym-key'];
  var gymRef = ref.child('gym').child(gymKey);
  var profileRef = ref.child("profile");

  var membersArray = $firebaseArray(gymRef.child("members"));

  var ClientService = {
    members: membersArray,

    addMember: function(member){
      console.log("fired addMember from clientservice");
      // User is supplied by front-end... should really register a profile too
      profileRef.orderByChild('email').equalTo(member.email).once('value', function(snapshot){
        if(snapshot.exists()){
          console.log("member was in database already");
          // User is already registered in rollcall, update the gym field
          var keyName = Object.keys(snapshot.val())[0];
          var memberRef = profileRef.child(keyName).ref();
          memberRef.update({gym: gymKey});
          member.uid = keyName;

          // This is where Stripe integration eventually goes TODO!
          return membersArray.$add(member);
        } else {
          console.log('doing new member');
          // User does not exist in the system, should registered
          member.gym = gymKey;
          member.fullname = member.firstName + " " + member.lastName;
          Auth.register(member).then(function(){
            // Member registered in Firebase Auth and Profile, now added to gym
            return membersArray.$add(member);
          });
        }
      });
    },

  };

  return ClientService;
});
