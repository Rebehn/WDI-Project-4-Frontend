angular.module('finalProject', ['ngResource', 'ui.router', 'satellizer', 'ngActionCable'])
  .constant('API_URL', 'https://talkr-app-api.herokuapp.com/api')
  // .constant('API_URL', 'http://localhost:3000/api')
  .config(Auth)
  .run(ActionCable);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.loginUrl = `${API_URL}/login`;
  $authProvider.signupUrl = `${API_URL}/register`;

  $authProvider.tokenPrefix = '';
}

ActionCable.$inject = ['ActionCableConfig'];
function ActionCable(ActionCableConfig) {
  ActionCableConfig.debug = true;
}
