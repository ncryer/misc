var app = angular.module('rollcall', [
  'ui.router',
  'ngMaterial',
  'firebase',
  'angularMoment',
  'ngAnimate',
  'ngResource'
])
.constant('FURL', 'https://rollcallalpha.firebaseio.com/')
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('login');


  // root
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'views/dashboard.html',
    //controller: 'dashController'
  });
});
