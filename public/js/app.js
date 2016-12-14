"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function ActionCable(e){e.debug=!0}function RegisterController(e,t){function o(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={},r.submit=o}function LoginController(e,t){function o(){e.login(r.credentials).then(function(){t.go("usersShow",{id:e.getPayload().id})})}var r=this;r.credentials={},r.submit=o}function Chatroom(e,t){return new e(t+"/chat_rooms/:id",{id:"@id"},{update:{method:"PUT"}})}function ChatroomsIndexController(e,t){function o(e){return!(e.private&&e.allowed_user_ids.indexOf(t.getPayload().id)<0)}var r=this;r.all=e.query(),r.hasAccess=o}function ChatroomsNewController(e,t){function o(){e.save(r.chatroom),t.go("chatrooms")}var r=this;r.chatroom={},r.submit=o}function ChatroomsShowController(e,t,o,r){function n(){d.chatroom.$update()}function l(e){return e.user_id===o.getPayload().id}function s(e){return e.id===d.currentUser.id}function a(e){d.chatroom.allowed_user_ids.push(e.id),n()}function i(e){return d.chatroom.allowed_user_ids.indexOf(e.id)<0}function u(e){return!(d.chatroom.allowed_user_ids.indexOf(e.id)<0||e.id===o.getPayload().id)}function c(e){var t=d.chatroom.allowed_user_ids.indexOf(e.id);d.chatroom.allowed_user_ids.splice(t,1),n()}var d=this;d.show=!1,d.chatroom=e.get(t.params),d.chatroom=e.get(t.params),d.update=n,d.isMyMessage=l,r.get({id:o.getPayload().id},function(e){d.currentUser=e,d.all=r.query()}),d.isSelf=s,d.filter={username:""},d.allowUser=a,d.showOnAllList=i,d.showOnInChatList=u,d.revokePrivilege=c}function MainController(e,t,o){function r(e,r,n){l.burgerOpen=!1,(!t.isAuthenticated()&&s.includes(r.name)||"usersEdit"===r.name&&parseFloat(n.id)!==t.getPayload().id)&&(e.preventDefault(),o.go("login"))}function n(){t.logout(),o.go("login")}var l=this,s=["usersEdit","usersIndex","usersShow","chatroomsIndex","chatroomsNew","chatrooms"];l.logout=n,l.isLoggedIn=t.isAuthenticated,e.$on("$stateChangeStart",r)}function MessageController(e,t,o,r,n,l){function s(e){return e.user_id===n.getPayload().id}console.log("Message controller loaded");var a=this;a.inputText="",r.get({id:n.getPayload().id},function(e){a.currentUser=e}),a.isOwnMessage=s,a.myData=t.query({chat_room_id:l.params.id});var i=new e("ChatChannel",{user:42,chat:37}),u=function(e){a.myData.push(e)};i.subscribe(u).then(function(){a.sendToMyChannel=function(e){var o={body:e,user_id:n.getPayload().id,chat_room_id:l.params.id};t.save(o),i.send(o)},o.$on("$destroy",function(){i.unsubscribe().then(function(){a.sendToMyChannel=void 0})})})}function Message(e,t){return new e(t+"/messages/:id",{id:"@id"},{update:{method:"PUT"}})}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("landing",{url:"/",templateUrl:"/templates/landing.html"}).state("chatrooms",{url:"/chatrooms",templateUrl:"/templates/chatroomsIndex.html",controller:"ChatroomsIndexController as chatroomsIndex"}).state("chatroomsNew",{url:"/chatrooms/new",templateUrl:"/templates/chatroomsNew.html",controller:"ChatroomsNewController as chatroomsNew"}).state("chatroomsShow",{url:"/chatrooms/:id",templateUrl:"/templates/chatroomsShow.html",controller:"ChatroomsShowController as chatroomsShow"}),t.otherwise("/")}function StatusController(e){this.status=e}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e,t){function o(e){return e.id===r.currentUser.id}var r=this;e.get({id:t.getPayload().id},function(t){r.currentUser=t,r.all=e.query()}),r.isSelf=o,r.filter={username:""}}function UsersShowController(e,t,o){function r(){return o.getPayload().id===Number(t.params.id)}var n=this;n.isCurrentUser=r,n.user=e.get(t.params)}function UsersEditController(e,t){var o=this;o.user=e.get(t.params)}angular.module("finalProject",["ngResource","ui.router","satellizer","ngActionCable"]).constant("API_URL","http://localhost:3000/api").config(Auth).run(ActionCable),Auth.$inject=["$authProvider","API_URL"],ActionCable.$inject=["ActionCableConfig"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Chatroom",Chatroom),Chatroom.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ChatroomsIndexController",ChatroomsIndexController).controller("ChatroomsNewController",ChatroomsNewController).controller("ChatroomsShowController",ChatroomsShowController),ChatroomsIndexController.$inject=["Chatroom","$auth"],ChatroomsNewController.$inject=["Chatroom","$state"],ChatroomsShowController.$inject=["Chatroom","$state","$auth","User"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$rootScope","$auth","$state"],angular.module("finalProject").controller("MessageController",MessageController),MessageController.$inject=["ActionCableChannel","Message","$scope","User","$auth","$state"],angular.module("finalProject").factory("Message",Message),Message.$inject=["$resource","API_URL"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").controller("StatusController",StatusController),StatusController.$inject=["ActionCableSocketWrangler"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User","$auth"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
