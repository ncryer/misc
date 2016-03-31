app.controller('loginController', function($scope, $state, Auth){

  var self = $scope;

  self.login = function(user){

    Auth.login(user).then(function(){
      // Set gym id in rootScope
      // Auth.user.profile.$loaded().then(function(){
      //   console.log('loaded triggered');
      //   Auth.gymKey = Auth.user.profile.gym.toString();
        $state.transitionTo('dashboard');
    }, function(err){
      console.log('error logging in');
    });
  };


  // Function to handle opening of login dialog
});
