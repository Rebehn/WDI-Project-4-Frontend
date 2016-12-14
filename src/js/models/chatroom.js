angular.module('finalProject')
  .factory('Chatroom', Chatroom);

Chatroom.$inject = ['$resource', 'API_URL'];
function Chatroom($resource, API_URL) {
  return new $resource(`${API_URL}/chat_rooms/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
