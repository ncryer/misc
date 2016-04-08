app.controller('dashController', function($scope, $state, Auth){

  var self = $scope;

  self.logout = function(){
    Auth.logout();
    $state.transitionTo('login');

  
  $scope.toggleLeft = buildToggler('left');

function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function () {
        $mdSidenav(navID)
            .toggle()
    }, 100);
    return debounceFn;
   };
}}]);
