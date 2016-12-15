angular.module('finalProject')
  .controller('ChatroomsIndexController', ChatroomsIndexController)
  .controller('ChatroomsNewController', ChatroomsNewController)
  .controller('ChatroomsShowController', ChatroomsShowController);

ChatroomsIndexController.$inject = ['Chatroom', '$auth'];
function ChatroomsIndexController(Chatroom, $auth) {
  const chatroomsIndex = this;

  chatroomsIndex.all = Chatroom.query();

  function hasAccess(chatroom) {
    return !(chatroom.private && (chatroom.allowed_user_ids.indexOf($auth.getPayload().id) < 0));
  }

  chatroomsIndex.hasAccess = hasAccess;
}

ChatroomsNewController.$inject = ['Chatroom','$state', '$auth'];
function ChatroomsNewController(Chatroom, $state, $auth) {
  const chatroomsNew = this;

  chatroomsNew.chatroom = {};
  function createChatroom() {
    chatroomsNew.chatroom.allowed_user_ids = [$auth.getPayload().id];
    Chatroom.save(chatroomsNew.chatroom);
    $state.go('chatrooms');
  }

  chatroomsNew.submit = createChatroom;
}

ChatroomsShowController.$inject = ['Chatroom', '$state', '$auth', 'User'];
function ChatroomsShowController(Chatroom, $state, $auth, User) {
  const chatroomsShow = this;
  chatroomsShow.show = false;
  chatroomsShow.chatroom = Chatroom.get($state.params);

  function update() {
    chatroomsShow.chatroom.$update();
  }
  chatroomsShow.chatroom = Chatroom.get($state.params);
  chatroomsShow.update = update;

  function isMyMessage(msg) {
    return msg.user_id === $auth.getPayload().id;
  }
  chatroomsShow.isMyMessage = isMyMessage;

  User.get({ id: $auth.getPayload().id }, (user) => {
    chatroomsShow.currentUser = user;
    chatroomsShow.all = User.query();
  });

  function isSelf(user) {
    return user.id === chatroomsShow.currentUser.id;
  }

  chatroomsShow.isSelf = isSelf;
  chatroomsShow.filter = { username: '' };

  function allowUser(user) {
    chatroomsShow.chatroom.allowed_user_ids.push(user.id);
    update();
  }
  chatroomsShow.allowUser = allowUser;

  function showOnAllList(user) {
    return (chatroomsShow.chatroom.allowed_user_ids.indexOf(user.id) < 0);
  }
  chatroomsShow.showOnAllList = showOnAllList;

  function showOnInChatList(user) {
    return !(chatroomsShow.chatroom.allowed_user_ids.indexOf(user.id) < 0 || user.id === $auth.getPayload().id);
  }
  chatroomsShow.showOnInChatList = showOnInChatList;

  function revokePrivilege(user) {
    const i = chatroomsShow.chatroom.allowed_user_ids.indexOf(user.id);
    chatroomsShow.chatroom.allowed_user_ids.splice(i, 1);
    update();
  }
  chatroomsShow.revokePrivilege = revokePrivilege;
}
