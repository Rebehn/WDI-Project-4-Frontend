angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$rootScope', '$auth', '$state'];
function MainController($rootScope, $auth, $state) {
  const main = this;
  const protectedStates = ['usersEdit'];

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
    $state.go('register');
  }

  main.logout = logout;

  $rootScope.$on('$stateChangeStart', secureState);
}
