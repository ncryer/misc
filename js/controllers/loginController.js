app.controller('loginController', function($scope, $state, $firebase, Auth){

  var self = $scope;

  self.login = function(user){
    Auth.login(user).then(function(){
      console.log('logged in');
      $state.transitionTo('dashboard');
    }, function(err){
      console.log('error logging in');
    });
  };
});
