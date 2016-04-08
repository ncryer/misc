var app = angular.module('rollcall', [
  'ui.router',
  'ui.calendar',
  'ngMaterial',
  'firebase',
  'angularMoment',
  'ngAnimate',
  'ngResource'
])

.constant('FURL', 'https://rollcallalpha.firebaseio.com/')
.config(function(FURL, $firebaseRefProvider){
  $firebaseRefProvider.registerUrl({
    default: FURL,
    profile: FURL + 'profile',
    gym: FURL + 'gym'
  })
})
.config(function($animateProvider){
   $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
})
.config(function($stateProvider, $urlRouterProvider, FURL){
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
    controller: 'dashController',
  })

  // Content states - stuff viewable in the dashboard
  .state('members', {
    url: '/members',
    templateUrl: 'views/partials/members.html',
    parent: 'dashboard',
    controller: 'clientController',
    resolve: {
      function(Auth, $firebaseRef){
        return Auth.getProfile();
      }
    }
  })
  .state('dashboard-content', {
    url: '/info',
    templateUrl: 'views/partials/dash-content.html',
    parent: 'dashboard'
  })
  .state('shop',{
    url: '/shop',
    templateUrl: 'views/partials/shop.html',
    parent: 'dashboard'
  })
  .state('classes', {
    url: '/classes',
    templateUrl: 'views/partials/classes.html',
    controller: 'classController',
    parent: 'dashboard'
  });
})
.config(function($mdThemingProvider){
  // toast theme
  $mdThemingProvider.theme('success-toast');
});
