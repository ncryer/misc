app.controller('loginController', function($scope, $state, Auth){

  var self = $scope;

  self.login = function(user){

    Auth.login(user).then(function(){
      $state.transitionTo('dashboard');
    }, function(err){
      console.log('error logging in');
    });
  };


  // Function to handle opening of login dialog
});
