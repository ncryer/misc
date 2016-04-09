app.controller('dashController', function($mdComponentRegistry, $mdUtil, $mdSidenav, $scope, $state, Auth){

  var self = $scope;

  self.logout = function(){
    Auth.logout();
    $state.transitionTo('login');
  };

  $mdComponentRegistry.when('left').then(function(component){
    component.toggle();
  });

  $scope.toggleLeft = buildToggler('left');

  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function(){
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          console.log("toggled");
        });
    },300);
    return debounceFn;
  };

});
