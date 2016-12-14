angular.module('finalProject')
  .controller('StatusController', StatusController);

StatusController.$inject = ['ActionCableSocketWrangler'];
function StatusController(ActionCableSocketWrangler){
  this.status = ActionCableSocketWrangler;
}
