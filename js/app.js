var app = angular.module('rollcall', [
  'ui.router',
  'ui.calendar',
  'ngMaterial',
  'firebase',
  'angularMoment',
  'ngAnimate',
  'ngResource',
  'ngMdIcons',
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
          .primaryPalette('teal')
          .accentPalette('indigo')
          .warnPalette('pink')
          .backgroundPalette('grey');

  $mdThemingProvider.theme('dark')
  .dark()
          .primaryPalette('grey', {
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '600', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
          .accentPalette('teal')
          .warnPalette('deep-purple')
		  .backgroundPalette('grey', {
      'default': '600' // use shade 200 for default, and keep all other shades the same
    });
 $mdThemingProvider.theme('light-on-dark')
        .primaryPalette('pink')
        .dark()
        .foregroundPalette['3'] ='rgba(198,198,198,0.9)';
  
  $mdThemingProvider.theme('Custom')
            .primaryPalette('teal', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '400', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '300', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '200' // use shade A100 for the <code>md-hue-3</code> class
    })
          .accentPalette('teal', {
		  'default': '600' // use shade 200 for default, and keep all other shades the same
    })
          .warnPalette('deep-purple')
		  .backgroundPalette('grey', {
      'default': '100' // use shade 200 for default, and keep all other shades the same
    });

});