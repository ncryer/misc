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

  $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('indigo')
          .warnPalette('pink')
          .backgroundPalette('grey');

  $mdThemingProvider.theme('custom')
          .primaryPalette('grey')
          .accentPalette('deep-purple')
          .warnPalette('teal')

    //create yr own palette 
  $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text         (contrast)
                                    // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

 $mdThemingProvider.theme('custom2')
        .primaryPalette('amazingPaletteName')

});


