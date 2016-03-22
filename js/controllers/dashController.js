app.controller('dashController', function($scope, $state, Auth){

  var self = $scope;

  self.logout = function(){
    Auth.logout();
    $state.transitionTo('login');
  }
});
