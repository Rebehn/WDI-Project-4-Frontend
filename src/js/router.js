angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('landing', {
      url: '/',
      templateUrl: '/templates/landing.html'
    })
    .state('chatrooms', {
      url: '/chatrooms',
      templateUrl: '/templates/chatroomsIndex.html',
      controller: 'ChatroomsIndexController as chatroomsIndex'
    })
    .state('chatroomsNew', {
      url: '/chatrooms/new',
      templateUrl: '/templates/chatroomsNew.html',
      controller: 'ChatroomsNewController as chatroomsNew'
    })
    .state('chatroomsShow', {
      url: '/chatrooms/:id',
      templateUrl: '/templates/chatroomsShow.html',
      controller: 'ChatroomsShowController as chatroomsShow'
    });

  $urlRouterProvider.otherwise('/');
}
