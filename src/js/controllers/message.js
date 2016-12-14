angular.module('finalProject')
  .controller('MessageController', MessageController);

MessageController.$inject = ['ActionCableChannel', 'Message', '$scope', 'User', '$auth', '$state'];
function MessageController(ActionCableChannel, Message, $scope, User, $auth, $state){
  console.log('Message controller loaded');
  const msg = this;
  msg.inputText = '';
  User.get({ id: $auth.getPayload().id }, (user) => {
    msg.currentUser = user;
    // msg.users.all = User.query();
  });

  function isOwnMsssage(message) {
    return message.user_id === $auth.getPayload().id;
  }

  msg.isOwnMessage = isOwnMsssage;

  msg.myData = Message.query({ chat_room_id: $state.params.id });
  // connect to ActionCable
  var consumer = new ActionCableChannel('ChatChannel', {user: 42, chat: 37});
  var callback = function(message) {
    msg.myData.unshift(message);
  };
  consumer.subscribe(callback).then(function(){
    msg.sendToMyChannel = function(message){
      const messageData = { body: message, user_id: $auth.getPayload().id, chat_room_id: $state.params.id };
      Message.save(messageData);
      consumer.send(messageData);
    };
    $scope.$on('$destroy', function(){
      consumer.unsubscribe().then(function(){
        msg.sendToMyChannel = undefined;
      });
    });
  });
}
