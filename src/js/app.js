angular.module('finalProject', ['ngResource', 'ui.router', 'satellizer', 'ngActionCable'])
  .constant('API_URL', window.location.hostname === 'localhost' ? 'http://locahost:3000/api' : 'https://limitless-headland-58759.herokuapp.com/api')
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
