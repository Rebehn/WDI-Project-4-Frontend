angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$auth', '$state'];
function MainController($rootScope, $auth, $state) {
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

  $rootScope.$on('$stateChangeStart', secureState);
}
