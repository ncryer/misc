app.controller('clientController', function(FURL, $scope, $mdDialog, $mdToast, ClientService, $firebaseObject){
  var self = $scope;

  var ref = new Firebase(FURL);
  self.member = null;
  self.members = ClientService.members;

  self.addMemberModal = function(){
    $mdDialog.show({
      controller: 'clientController',
      templateUrl: '../../views/partials/modals/addMember.html',
      clickOutsideToClose:true
    });
  };

  // Functions
  self.addMember = function(member){
    ClientService.addMember(member);
    $mdToast.show(
          $mdToast.simple()
          .textContent('Success')
          .theme('success-toast')
          .position('top left right'));
    $mdDialog.hide();
  };

  self.memberDetailsModal = function(e, member){
    $mdDialog.show({
      templateUrl: '../../views/partials/modals/memberDetails.html',
      clickOutsideToClose: true,
      controller: function($mdDialog, $mdToast, ClientService){
        var vm = this;
        vm.EditMode = false;

        vm.member = {};
        vm.member = $firebaseObject(ref.child("profile").child(member.$id));

        vm.save = function(){
          // Preserve member.fullname if names were edited
          vm.member.fullname = vm.member.firstName + " " + vm.member.lastName;
          ClientService.saveMemberEdit(vm.member).then(function(){
            $mdToast.show(
                  $mdToast.simple()
                  .textContent('Success')
                  .theme('success-toast')
                  .position('top left right'));
            // Save member profile in gym.members too
            $mdDialog.hide();
          });
          // vm.member.$save().then(function(){

          // });
        };

      },
      controllerAs: 'modal',
      targetEvent: e
    });
  }
});
