angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$auth', '$state', 'User'];
function MainController($rootScope, $auth, $state, User) {
  const main = this;
  const protectedStates = ['usersEdit', 'usersIndex', 'usersShow', 'chatroomsIndex', 'chatroomsNew', 'chatrooms'];

  function secureState(e, toState, toParams) {
    main.burgerOpen = false;
    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('login');
    }
  }

  function logout() {
    $auth.logout();
    $state.go('landing');
  }
  main.logout = logout;

  main.isLoggedIn = $auth.isAuthenticated;

  main.currentUser = User.get({id: $auth.getPayload().id });

  $rootScope.$on('$stateChangeStart', secureState);
}
