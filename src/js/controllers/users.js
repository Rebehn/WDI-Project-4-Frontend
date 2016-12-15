angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User', '$auth'];
function UsersIndexController(User, $auth) {
  const usersIndex = this;

  User.get({ id: $auth.getPayload().id }, (user) => {
    usersIndex.currentUser = user;
    usersIndex.all = User.query();
  });

  function isSelf(user) {
    return user.id === usersIndex.currentUser.id;
  }
  usersIndex.isSelf = isSelf;
  usersIndex.filter = { username: '' };
}

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;

  function isCurrentUser() {
    return $auth.getPayload().id === Number($state.params.id);
  }

  usersShow.isCurrentUser = isCurrentUser;

  usersShow.user = User.get($state.params);
}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function submit() {
    console.log(usersEdit.user);
    usersEdit.user.$update(() => {
      $state.go('usersShow', { id: usersEdit.user.id });
    });
  }
  usersEdit.submit = submit;
}
